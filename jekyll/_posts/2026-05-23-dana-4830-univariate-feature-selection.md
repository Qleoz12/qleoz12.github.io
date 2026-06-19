---
title: "DANA 4830 — Univariate feature selection: Chi2, ANOVA, MI, Pearson, ReliefF"
search: false
categories:
  - Statistics
  - Machine Learning
date: 2026-05-23
last_modified_at: 2026-05-23T12:00:00-06:00
share: linkedin
math: true
---

**Univariate** feature selection ranks **one column at a time**. The paper (Zouhri et al., 2024) uses five univariate **filters**, then keeps the top **20%, 40%, or 60%** of ranked features.

This post covers **what each method asks**, **when to use it**, and **Python** you can run on a public fraud dataset.

Previous: [paper overview and MCAR/MAR/NMAR](/2026/05/22/dana-4830-feature-selection-paper-overview/).

---

## Univariate vs multivariate (one line)

| Type | Looks at | Paper methods |
|:-----|:---------|:--------------|
| **Univariate** | Each feature **alone** | Chi2, ANOVA, MI, Pearson, ReliefF |
| **Multivariate** | **Subsets** of features together | CFS, CON, DISR |

Univariate methods are fast and good as a **first pass**. They **do not** remove redundancy between two strong but similar columns (e.g. `V12` and `V14` in fraud data).

---

## Shared pipeline (matches the paper)

```
Raw data
  → drop duplicates, handle missing values
  → encode categoricals (if any)
  → scale numeric columns when required (Chi2, SVM)
  → score each feature (univariate filter)
  → keep top 20% / 40% / 60%
  → train classifier (RF, XGB, SVM)
  → cross-validate: Precision, Recall, F1, AUC
```

---

## Dataset for practice

**Starter:** [Credit Card Fraud Detection](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud) — 284,807 rows, 30 numeric features, target `Class` (0/1). Conceptually similar to IDS (attack vs benign).

**Assignment scale:** IEEE-CIS Fraud — more columns, categoricals, missing values (see MCAR/MAR/NMAR in the overview post).

```python
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv("creditcard.csv")
X = df.drop(columns=["Class"])
y = df["Class"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

---

## 1. Chi-square (K)

**Question:** Is this feature **statistically dependent** on the class?

**Best for:** categorical or **non-negative** numeric features (after scaling to \([0,1]\)).

**IDS example:** does `protocol = TCP` appear more often in attacks than in benign traffic?

**Fraud example:** after one-hot encoding `card4 = visa/master/...`, does one card type co-occur with fraud?

```python
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.preprocessing import MinMaxScaler

# Chi2 requires non-negative values
scaler = MinMaxScaler()
X_train_pos = scaler.fit_transform(X_train)
X_test_pos = scaler.transform(X_test)

k = max(1, int(0.4 * X_train.shape[1]))  # 40% threshold like the paper
chi_selector = SelectKBest(score_func=chi2, k=k)
X_train_chi = chi_selector.fit_transform(X_train_pos, y_train)
X_test_chi = chi_selector.transform(X_test_pos)

selected = X.columns[chi_selector.get_support()]
print("Chi2 top features:", list(selected[:10]))
```

**Note:** use `MinMaxScaler`, not `StandardScaler` (negative values break Chi2).

---

## 2. ANOVA / F-test (A)

**Question:** Do **class means** differ significantly for this numeric feature?

**Best for:** continuous variables (`TransactionAmt`, `Amount`, `V1`…`V28`).

**Fraud example:**

| Class | Mean Amount |
|:------|------------:|
| 0 (normal) | 88 |
| 1 (fraud) | 122 |

ANOVA asks: is that difference larger than random noise?

```python
from sklearn.feature_selection import SelectKBest, f_classif

k = max(1, int(0.4 * X_train.shape[1]))
anova_selector = SelectKBest(score_func=f_classif, k=k)
X_train_anova = anova_selector.fit_transform(X_train, y_train)

scores = pd.Series(anova_selector.scores_, index=X.columns).sort_values(ascending=False)
print(scores.head(10))
```

**Chi2 vs ANOVA**

| | Chi-square | ANOVA |
|:--|:-----------|:------|
| Typical input | Categorical / non-negative | Numeric continuous |
| Tests | Dependence | Difference of means |
| Needs positive values | Yes | No |

For IEEE-CIS: ANOVA on `TransactionAmt`, `D1`–`D15`; Chi2 on one-hot `ProductCD`, `card4`, etc.

---

## 3. Mutual Information (MI)

**Question:** How much does this feature **reduce uncertainty** about the class?

**Best for:** **non-linear** relationships ANOVA or Pearson can miss.

**Intuition:** if knowing `V17` makes the class much more predictable, MI is high — even without a straight-line correlation.

```python
from sklearn.feature_selection import mutual_info_classif, SelectKBest

mi_scores = mutual_info_classif(X_train, y_train, random_state=42)
mi_rank = pd.Series(mi_scores, index=X.columns).sort_values(ascending=False)

mi_selector = SelectKBest(
    score_func=lambda X, y: mutual_info_classif(X, y, random_state=42),
    k=max(1, int(0.4 * X_train.shape[1]))
)
X_train_mi = mi_selector.fit_transform(X_train, y_train)
print(mi_rank.head(10))
```

---

## 4. Pearson correlation (C)

**Question:** How **linearly** correlated is the feature with the target?

**Best for:** quick scan; interpretable sign (+ / −).

**Limit:** misses non-linear patterns that MI or tree models catch.

```python
pearson = X_train.assign(Class=y_train).corr(numeric_only=True)["Class"].drop("Class")
pearson_abs = pearson.abs().sort_values(ascending=False)
print(pearson_abs.head(10))

top40 = pearson_abs.head(max(1, int(0.4 * len(pearson_abs)))).index.tolist()
```

---

## 5. ReliefF (RL)

**Paper idea:** a feature is good if it has **similar values** for neighbors of the **same class** and **different values** for neighbors of the **other class**.

**Best for:** local structure; can capture interactions better than raw correlation.

Python (needs `skrebate` or `sklearn-feature-selection` package):

```python
# pip install skrebate
from skrebate import ReliefF
import numpy as np

sample_n = min(5000, len(X_train))  # ReliefF can be slow on full data
idx = np.random.RandomState(42).choice(len(X_train), sample_n, replace=False)

relief = ReliefF(n_features_to_select=12, n_neighbors=10)
relief.fit(X_train.iloc[idx].values, y_train.iloc[idx].values)

relief_rank = pd.Series(relief.top_features_, index=X.columns).sort_values(ascending=False)
print(relief_rank.head(10))
```

If you cannot install ReliefF, treat **MI + ANOVA** as your univariate baseline — the paper ranks ReliefF highly on several IDS subsets.

---

## Thresholds: 20%, 40%, 60%

The paper keeps the **top fraction** of the ranking list.

| Threshold | 30 features (Credit Card) | Effect |
|:----------|:--------------------------|:-------|
| 20% | 6 features | Aggressive reduction; risk losing signal |
| 40% | 12 features | Middle ground |
| 60% | 18 features | Mild reduction |

```python
def top_fraction(scores: pd.Series, frac: float) -> list[str]:
    k = max(1, int(frac * len(scores)))
    return scores.sort_values(ascending=False).head(k).index.tolist()

for frac in [0.2, 0.4, 0.6]:
    print(f"{int(frac*100)}%:", top_fraction(scores, frac)[:5], "...")
```

---

## Compare univariate methods with one classifier

Same split, same model — only the feature set changes. That mirrors the paper's controlled comparison.

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

def evaluate(X_tr, X_te, y_tr, y_te, label):
    clf = RandomForestClassifier(
        n_estimators=200, random_state=42, class_weight="balanced", n_jobs=-1
    )
    clf.fit(X_tr, y_tr)
    prob = clf.predict_proba(X_te)[:, 1]
    print(f"\n=== {label} ===")
    print(classification_report(y_te, clf.predict(X_te), digits=3))
    print("ROC-AUC:", round(roc_auc_score(y_te, prob), 4))

evaluate(X_train, X_test, y_train, y_test, "All features")
evaluate(X_train_chi, X_test_chi, y_train, y_test, "Chi2 40%")
evaluate(X_train_anova, X_test_anova, y_train, y_test, "ANOVA 40%")
evaluate(X_train_mi, mi_selector.transform(X_test), y_train, y_test, "MI 40%")
```

**What to expect (aligned with paper):**

- FS often helps **SVM** more than **XGB**.
- On Credit Card Fraud, **XGB with all features** is already strong; FS may **not** improve AUC much.
- For fraud, watch **Recall** and **PR-AUC**, not Accuracy (severe imbalance).

---

## Type I error when testing many features

Each univariate test at \(\alpha = 0.05\) has a 5% false-positive rate. With **339** V-features in IEEE-CIS, ~17 may look "significant" by luck.

**Mitigation (what the paper does):**

1. Rank features, do not trust a single p-value cutoff blindly.
2. Validate with **cross-validated classifier performance**.
3. Compare multiple metrics (Precision, Recall, F1, AUC).

---

## Univariate EDA (exploratory, before FS)

Feature selection is not the same as EDA, but you should still look at each variable alone:

| Analysis | Tool | Purpose |
|:---------|:-----|:--------|
| Distribution per class | histogram / KDE | see separation |
| Missing rate | `isna().mean()` | MCAR/MAR check |
| Outliers | boxplot | bad scaling / leakage |

```python
import seaborn as sns
import matplotlib.pyplot as plt

feat = "V14"
sns.histplot(data=df, x=feat, hue="Class", stat="density", common_norm=False)
plt.title(f"Univariate view: {feat}")
plt.show()
```

---

## Summary table

| Method | Code | Use when |
|:-------|:-----|:---------|
| Chi-square | K | Categorical / one-hot / non-negative |
| ANOVA | A | Numeric continuous |
| Mutual Information | MI | Non-linear, flexible |
| Pearson | C | Quick linear scan |
| ReliefF | RL | Local neighbor structure |

**Next:** [Multivariate FS Part 1 — CFS and mRMR logic](/2026/05/24/dana-4830-multivariate-feature-selection-part1/) (features as a **team**, not solo players).

---

## References

- Zouhri et al. (2024) — §2.1 Univariate methods
- `sklearn.feature_selection`: [SelectKBest](https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.SelectKBest.html)

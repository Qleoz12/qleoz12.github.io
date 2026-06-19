---
title: "DANA 4830 — Multivariate feature selection Part 2: CON, DISR, and fraud dataset pipeline"
search: false
categories:
  - Statistics
  - Machine Learning
date: 2026-05-25
last_modified_at: 2026-05-25T12:00:00-06:00
share: linkedin
math: true
---

Part 2 of multivariate (**bivariate-and-beyond**) feature selection from Zouhri et al. (2024): **CON**, **DISR**, how they differ from **CFS**, and a **full Python pipeline** you can run on public fraud data (same logic as IEEE-CIS for your assignment).

Previous: [Part 1 — mRMR and CFS](/2026/05/24/dana-4830-multivariate-feature-selection-part1/) · [Univariate](/2026/05/23/dana-4830-univariate-feature-selection/) · [Paper overview](/2026/05/22/dana-4830-feature-selection-paper-overview/)

---

## Multivariate methods in the paper (recap)

| Method | Core idea | One-line |
|:-------|:----------|:---------|
| **CFS** | High target correlation, low inter-feature correlation | No duplicate teammates |
| **CON** | Minimize **inconsistency** in the subset | Same X-values should not split across classes |
| **DISR** | **Joint** information beats sum of parts | Synergy between features |

Paper result: **XGBoost** and **Random Forest** with **CON** and **DISR** subsets often matched or beat full feature sets on IDS data.

---

## CON — Consistency-based subset selection

**Paper (§2.2b):** the best subset has the **lowest inconsistency rate**.

A subset is **inconsistent** when two rows have the **same values on all selected features** but belong to **different classes**.

### Example (toy fraud table)

| Row | `Amount` | `Hour` | `isFraud` |
|:----|---------:|-------:|:---------:|
| 1 | 100 | 14 | 0 |
| 2 | 100 | 14 | **1** |
| 3 | 500 | 3 | 1 |

If you select `{Amount, Hour}` only, rows 1 and 2 are **identical** on those features but different class → **inconsistent**.

CON searches for subsets where matching feature vectors usually imply the **same class**.

### Why it matters for IDS / fraud

Attack traffic (or fraud) sometimes shares surface stats with benign rows. CON pushes toward feature sets that **separate classes cleanly** in the training space — related to **decision boundary clarity**, not just marginal correlation.

### Practical Python proxy

Exact CON uses search over subsets (expensive). For learning, use a **consistency score** on candidate features from mRMR/CFS:

```python
import pandas as pd
import numpy as np

def inconsistency_rate(X_sub: pd.DataFrame, y: pd.Series) -> float:
    """Fraction of duplicate feature rows that disagree on class."""
    grouped = X_sub.assign(_y=y).groupby(list(X_sub.columns))["_y"]
    bad = 0
    total = 0
    for _, labels in grouped:
        n = len(labels)
        if n > 1:
            total += n
            bad += labels.nunique() > 1
    return bad / total if total else 0.0

# Example on Credit Card subset
from sklearn.model_selection import train_test_split

df = pd.read_csv("creditcard.csv")
X = df.drop(columns=["Class"])
y = df["Class"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

candidate = ["V14", "V12", "V10", "V17", "V4", "V3"]
print("Inconsistency:", inconsistency_rate(X_train[candidate], y_train))
```

For assignments: compare inconsistency **before** FS (all features binned) vs **after** CFS/mRMR subset — lower is better **if** AUC holds.

---

## DISR — Double Input Symmetric Relevance

**Paper (§2.2c):** a set of variables together can carry **more information** about the class than the sum of each variable alone.

### Intuition

| Feature alone | Joint with partner |
|:--------------|:-------------------|
| `country = US` → weak fraud signal | `country = US` **and** `email_domain missing` → strong signal |
| `Amount` moderate | `Amount` high **and** `new_device = 1` → strong signal |

DISR targets **synergy** — classic **bivariate interaction** that univariate ANOVA misses.

### Practical proxy: interaction + tree importance

Full DISR needs specialized libraries. Two assignment-friendly proxies:

**1. Add explicit interaction terms for top pairs**

```python
top = ["V14", "V12", "V10"]
X_int = X_train[top].copy()
for i in range(len(top)):
    for j in range(i + 1, len(top)):
        name = f"{top[i]}_x_{top[j]}"
        X_int[name] = X_train[top[i]] * X_train[top[j]]
```

**2. Let XGBoost reveal joint splits (embedded FS)**

```python
import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=200,
    max_depth=4,
    learning_rate=0.1,
    scale_pos_weight=(y_train == 0).sum() / (y_train == 1).sum(),
    random_state=42,
    eval_metric="logloss",
)
model.fit(X_train, y_train)

imp = pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False)
top_disr_proxy = imp.head(15).index.tolist()
print(top_disr_proxy)
```

Report this as: **"DISR concept — joint relevance approximated via interaction terms / XGB split gains."**

---

## Bivariate analysis on your fraud dataset

Before multivariate FS, run **pair-level** EDA on the subset you kept in Part 1.

### Correlation with target (bivariate numeric)

```python
import seaborn as sns
import matplotlib.pyplot as plt

features = ["V14", "V12", "V10", "V17", "V4"]
plot_df = X_train[features].assign(isFraud=y_train.values)

sns.pairplot(plot_df, hue="isFraud", corner=True, plot_kws={"alpha": 0.4, "s": 8})
plt.suptitle("Bivariate EDA: pairwise views", y=1.02)
plt.show()
```

### Cross-tab (bivariate categorical — IEEE-CIS style)

After encoding:

```python
# Example pattern for IEEE-CIS
# pd.crosstab(df["ProductCD"], df["isFraud"], normalize="index")
```

Read: if fraud rate changes sharply across categories, Chi2/univariate FS will rank that column high; CON/DISR ask whether **combinations** add separation.

---

## Full reproduction pipeline (paper → fraud domain)

Mirrors paper §5 — Steps 1–4 simplified without Bayesian optimization.

```
┌─────────────────────────────────────────────────────────┐
│ 1. Clean: missing, duplicates, drop ID columns          │
│ 2. Encode categoricals (IEEE-CIS)                       │
│ 3. Univariate FS: Chi2 / ANOVA / MI @ 20%, 40%, 60%   │
│ 4. Multivariate FS: CFS-like, mRMR, CON proxy, DISR proxy│
│ 5. Models: RF, XGB, SVM (same CV folds)                 │
│ 6. Metrics: Precision, Recall, F1, ROC-AUC, PR-AUC    │
│ 7. Compare: full features vs each subset              │
└─────────────────────────────────────────────────────────┘
```

### End-to-end script skeleton

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import StratifiedKFold, cross_validate
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.pipeline import Pipeline
from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
import xgboost as xgb

df = pd.read_csv("creditcard.csv")
X = df.drop(columns=["Class"])
y = df["Class"]

# --- Multivariate: CFS-like (from Part 1) ---
rel = X.corrwith(y).abs().sort_values(ascending=False)
pool = rel.head(int(0.6 * X.shape[1])).index
cm = X[pool].corr().abs()
upper = cm.where(np.triu(np.ones(cm.shape), k=1).astype(bool))
drop = {c for c in upper.columns if any(upper[c] > 0.9)}
cfs_cols = [c for c in pool if c not in drop]

# --- Univariate 40% ---
k = max(1, int(0.4 * X.shape[1]))
anova = SelectKBest(f_classif, k=k).fit(X, y)
anova_cols = X.columns[anova.get_support()].tolist()

subsets = {
    "all_100": X.columns.tolist(),
    "anova_40": anova_cols,
    "cfs": cfs_cols,
}

models = {
    "RF": RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42, n_jobs=-1),
    "XGB": xgb.XGBClassifier(
        n_estimators=200, max_depth=4, learning_rate=0.1,
        scale_pos_weight=(y == 0).sum() / (y == 1).sum(),
        random_state=42, eval_metric="logloss",
    ),
    "SVM": Pipeline([
        ("scale", StandardScaler()),
        ("svc", SVC(kernel="rbf", class_weight="balanced", probability=True, random_state=42)),
    ]),
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scoring = ["accuracy", "precision", "recall", "f1", "roc_auc"]

rows = []
for sub_name, cols in subsets.items():
    X_sub = X[cols]
    for model_name, model in models.items():
        scores = cross_validate(model, X_sub, y, cv=cv, scoring=scoring, n_jobs=-1)
        rows.append({
            "subset": sub_name,
            "model": model_name,
            "n_features": len(cols),
            **{m: scores[f"test_{m}"].mean() for m in scoring},
        })

results = pd.DataFrame(rows).sort_values("roc_auc", ascending=False)
print(results.round(4))
```

### How to read your table (paper-style)

| Pattern | Interpretation |
|:--------|:---------------|
| `SVM` + `anova_40` >> `SVM` + `all_100` | FS helps SVM (noise reduction) |
| `XGB` + `all_100` ≈ `XGB` + `cfs` | XGB already handles weak features |
| `RF` + `cfs` ≥ `RF` + `all_100` on IEEE-CIS-like data | Redundancy removed, speed up |
| High Accuracy but low Recall on fraud | Wrong metric focus — use PR-AUC |

---

## Scott–Knott and Borda (simplified for your assignment)

You may not implement SK test on day one. Use this workflow:

1. Run 5-fold CV for each `(subset, model)` pair.
2. Group rows within **0.5% ROC-AUC** as "same cluster".
3. Inside the best cluster, rank by **average rank** across Precision, Recall, F1, AUC (Borda idea).

```python
best = results[results["roc_auc"] >= results["roc_auc"].max() - 0.005]
best["borda"] = (
    best[["precision", "recall", "f1", "roc_auc"]]
    .rank(ascending=False)
    .sum(axis=1)
)
print(best.sort_values("borda"))
```

---

## PCA side experiment (paper contrast)

Same folds, compare **selection vs extraction**:

```python
from sklearn.decomposition import PCA

n = 12  # match CFS subset size
pca_pipe = Pipeline([
    ("scale", StandardScaler()),
    ("pca", PCA(n_components=n)),
    ("rf", RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42)),
])

pca_scores = cross_validate(pca_pipe, X, y, cv=cv, scoring=scoring, n_jobs=-1)
print({m: pca_scores[f"test_{m}"].mean() for m in scoring})
```

Write-up sentence:

> PCA reduced dimensionality by constructing new components, while CFS preserved interpretable original features; on fraud data, CFS-like selection retained column names for analysis while PCA absorbed redundancy into latent factors.

---

## IEEE-CIS assignment checklist

| Step | Action |
|:-----|:-------|
| Download | [IEEE-CIS Fraud Detection](https://www.kaggle.com/c/ieee-fraud-detection) |
| Merge | `train_transaction` + `train_identity` on `TransactionID` |
| Target | `isFraud` |
| Missing | Report MCAR/MAR/NMAR per column group (D, V, C blocks) |
| Univariate | ANOVA on numeric; Chi2 on one-hot categoricals |
| Multivariate | CFS on V-block; interaction proxy for DISR |
| Models | RF, XGB, SVM — same as paper |
| Metrics | **Recall**, **PR-AUC** primary; Accuracy secondary |
| Compare | 228 variants is optional; start with 12–20 key combos |

---

## What the paper teaches (final takeaway)

1. **Feature selection is not always an improvement** — especially for **XGB**.
2. **Multivariate filters** (CON, DISR) can match full feature performance with **fewer columns** on high-dimensional IDS data.
3. **Univariate** methods rank fast but keep redundancy.
4. **Benchmark discipline** (same CV, multiple metrics, ranking) matters more than one lucky train/test split.
5. For **fraud**, connect IDS logic: attacks ≈ fraud, benign ≈ normal transactions.

---

## Series index

1. [Paper overview + MCAR/MAR/NMAR](/2026/05/22/dana-4830-feature-selection-paper-overview/)
2. [Univariate FS](/2026/05/23/dana-4830-univariate-feature-selection/)
3. [Multivariate Part 1 — CFS / mRMR](/2026/05/24/dana-4830-multivariate-feature-selection-part1/)
4. **This post** — CON, DISR, full pipeline

---

## References

- Zouhri et al. (2024) — §2.2, §5 Experimental design, §6 Results
- Dash, M., & Liu, H. (1997). Consistency-based search in feature selection (CON)
- IEEE-CIS Fraud Detection competition data
- Credit Card Fraud Detection (Kaggle) — practice dataset

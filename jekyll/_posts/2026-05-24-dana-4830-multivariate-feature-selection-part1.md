---
title: "DANA 4830 — Multivariate feature selection Part 1: mRMR and CFS"
search: false
categories:
  - Statistics
  - Machine Learning
date: 2026-05-24
last_modified_at: 2026-05-24T12:00:00-06:00
share: linkedin
math: true
---

**Multivariate** (sometimes called **bivariate-and-beyond**) feature selection picks a **subset** of columns by judging them **together**. Univariate methods pick strong features **one by one** but may keep two columns that say the same thing.

Paper: Zouhri et al. (2024), §2.2 — **CFS**, **CON**, **DISR**, all grounded in **mRMR**.

Previous: [Univariate FS](/2026/05/23/dana-4830-univariate-feature-selection/) · [Paper overview](/2026/05/22/dana-4830-feature-selection-paper-overview/)  
Next: [Part 2 — CON, DISR, full benchmark](/2026/05/25/dana-4830-multivariate-feature-selection-part2/)

---

## Why univariate is not enough

Suppose you predict fraud with IEEE-CIS-style columns:

| Feature | Correlation with `isFraud` | Correlation with each other |
|:--------|:--------------------------:|:----------------------------:|
| `TransactionAmt` | High | Low with others |
| `V12` | High | **0.95** with `V14` |
| `V14` | High | **0.95** with `V12` |

Univariate ANOVA might keep **both** `V12` and `V14`. Multivariate logic says: pick one; they are **redundant**.

```
Univariate thinking:  "Who are the best solo players?"
Multivariate thinking: "Who forms the best TEAM without repeating roles?"
```

---

## mRMR — Maximum Relevance, Minimum Redundancy

The paper's multivariate filters follow **mRMR**:

At each step, add the feature that:

1. Has **high relevance** to the target (class).
2. Has **low redundancy** with features already chosen.

\[
\text{score}(f) = \text{relevance}(f, y) - \text{redundancy}(f, S)
\]

where \(S\) is the set already selected.

| Term | Meaning | Fraud example |
|:-----|:--------|:--------------|
| **Relevance** | Feature helps predict fraud | `TransactionAmt` higher in fraud rows |
| **Redundancy** | Feature duplicates info already in \(S\) | `V12` after `V14` is already in the set |

---

## CFS — Correlation-based Feature Subset Selection

**Paper definition (§2.2a):** choose features with

- **High** feature–class correlation
- **Low** feature–feature correlation inside the subset

### Intuition

```
Target: isFraud

Good pair for CFS:
  TransactionAmt  ──high──► isFraud
  card_region     ──high──► isFraud
  TransactionAmt  ──low──► card_region   (different signal)

Bad pair for univariate-only ranking:
  V12 ──high──► isFraud
  V14 ──high──► isFraud
  V12 ──0.95──► V14   (almost same signal twice)
```

CFS prefers **`V12` OR `V14`**, not necessarily both.

---

## CFS-like implementation in Python

`sklearn` has no official CFS class. A **CFS-like** pipeline (good for learning and assignments):

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv("creditcard.csv")
X = df.drop(columns=["Class"])
y = df["Class"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Step 1: relevance = |correlation| with target
relevance = X_train.corrwith(y_train).abs().sort_values(ascending=False)

# Step 2: candidate pool (top 60% by relevance — paper uses multiple thresholds)
pool_size = max(5, int(0.6 * X_train.shape[1]))
candidates = relevance.head(pool_size).index.tolist()

# Step 3: drop redundant pairs (feature-feature |corr| > threshold)
X_pool = X_train[candidates]
corr_ff = X_pool.corr().abs()
upper = corr_ff.where(np.triu(np.ones(corr_ff.shape), k=1).astype(bool))

to_drop = set()
for col in upper.columns:
    if any(upper[col] > 0.90):
        to_drop.add(col)

selected_cfs = [c for c in candidates if c not in to_drop]
print(f"CFS-like: {len(selected_cfs)} features from {X_train.shape[1]}")
print(selected_cfs[:15])
```

### What you can report in an assignment

| Question | How CFS answers it |
|:---------|:-------------------|
| Which features explain fraud? | High relevance list |
| Which features repeat each other? | Dropped by high feature–feature correlation |
| How many columns removed? | `before - after` count |
| Does RF still work? | Train before/after and compare AUC |

---

## Greedy mRMR (closer to the paper's iterative idea)

```python
from sklearn.feature_selection import mutual_info_classif

def mrmr_greedy(X, y, k=12):
    mi = pd.Series(
        mutual_info_classif(X, y, random_state=42),
        index=X.columns
    )
    selected = []
    remaining = list(X.columns)

    for _ in range(k):
        best_score, best_feat = -np.inf, None
        for f in remaining:
            rel = mi[f]
            red = 0.0
            if selected:
                red = X[selected].corrwith(X[f]).abs().mean()
            score = rel - red
            if score > best_score:
                best_score, best_feat = score, f
        selected.append(best_feat)
        remaining.remove(best_feat)
    return selected

mrmr_features = mrmr_greedy(X_train, y_train, k=12)
print("mRMR subset:", mrmr_features)
```

This mirrors the paper's description: each iteration adds the feature with **best relevance minus redundancy**.

---

## Bivariate analysis vs multivariate FS

In coursework, **bivariate analysis** often means **two variables at a time** (scatter, correlation matrix, cross-tab). That is **exploratory**. **CFS / mRMR** is **selective** — it uses pairwise relationships to **build a subset**.

| Stage | What you do | Example |
|:------|:------------|:--------|
| **Bivariate EDA** | Understand pairs | `sns.heatmap(X.corr())`, `TransactionAmt` vs `isFraud` |
| **Multivariate FS** | Choose subset | CFS drops redundant pairs; mRMR builds a team |

```python
import seaborn as sns
import matplotlib.pyplot as plt

cols = ["V14", "V12", "V10", "V17", "TransactionAmt"] if "TransactionAmt" in X.columns else ["V14", "V12", "V10", "V17", "V4"]
sns.heatmap(X_train[cols].corr(), annot=True, fmt=".2f", cmap="coolwarm")
plt.title("Bivariate view: feature–feature correlations")
plt.show()
```

High off-diagonal values → redundancy CFS will penalize.

---

## IEEE-CIS: where CFS helps most

IEEE-CIS has blocks of similar columns:

| Block | Typical issue | CFS effect |
|:------|:--------------|:-----------|
| `V1`–`V339` | Many correlated anonymized counts | Large reduction |
| `C1`–`C14`, `D1`–`D15` | Overlapping signals | Drop duplicates |
| Categorical (`card4`, `ProductCD`) | Need encoding before correlation | One-hot first, then CFS on numeric block |

Suggested workflow:

```
1. Split numeric vs categorical
2. One-hot encode categoricals
3. ANOVA / Chi2 univariate pass (optional pre-filter)
4. CFS or mRMR on numeric pool
5. Union with top categorical dummies (careful with redundancy)
```

---

## Compare univariate vs CFS with Random Forest

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score, classification_report

def rf_auc(X_tr, X_te, y_tr, y_te):
    rf = RandomForestClassifier(
        n_estimators=200, random_state=42, class_weight="balanced", n_jobs=-1
    )
    rf.fit(X_tr, y_tr)
    prob = rf.predict_proba(X_te)[:, 1]
    return roc_auc_score(y_te, prob)

X_train_cfs = X_train[selected_cfs]
X_test_cfs = X_test[selected_cfs]

print("AUC all features:", rf_auc(X_train, X_test, y_train, y_test))
print("AUC CFS-like:", rf_auc(X_train_cfs, X_test_cfs, y_train, y_test))
print("AUC mRMR:", rf_auc(X_train[mrmr_features], X_test[mrmr_features], y_train, y_test))
```

**Paper-aligned expectation:** CFS-like subsets are **smaller** with **similar or better** AUC for RF/SVM on redundant IDS data. On Credit Card (already 30 PCA-like features), gains may be **small** — the big win shows up on **high-dimensional** IEEE-CIS.

---

## CFS vs PCA (again)

| | CFS | PCA |
|:--|:----|:----|
| Output | Original column names | New components `PC1`, `PC2`, … |
| Interpretability | "We kept `TransactionAmt`" | "PC1 mixes 40 columns" |
| Redundancy | Explicitly minimized | Absorbed into components |
| Paper category | Feature **selection** | Feature **extraction** |

For an assignment comparing both: run **CFS → RF** and **PCA → RF** with the same CV folds.

---

## Checklist before Part 2

- [ ] Univariate ranking done (ANOVA / MI at 20–60%)
- [ ] Correlation heatmap on top 20 numeric columns
- [ ] CFS-like or mRMR subset built
- [ ] RF benchmark: full vs CFS vs mRMR
- [ ] Document **how many** features removed and **which** pairs were redundant

**Next post:** [CON, DISR, Scott–Knott mindset, and the full reproduction pipeline on fraud data](/2026/05/25/dana-4830-multivariate-feature-selection-part2/).

---

## References

- Zouhri et al. (2024) — §2.2 Multivariate methods; CFS [Hall, 1999]
- Peng, H., Long, F., & Ding, C. (2005). Feature selection based on mutual information: mRMR
- Part 1 paper overview: [MCAR/MAR/NMAR](/2026/05/22/dana-4830-feature-selection-paper-overview/)

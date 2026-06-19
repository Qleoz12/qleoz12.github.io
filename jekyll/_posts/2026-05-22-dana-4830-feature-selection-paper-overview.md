---
title: "DANA 4830 — Feature selection paper: how to read it, MCAR/MAR/NMAR, and the big ideas"
search: false
categories:
  - Statistics
  - Machine Learning
date: 2026-05-22
last_modified_at: 2026-05-22T12:00:00-06:00
share: linkedin
math: true
---

Study notes for **DANA 4830** on the paper:

> **Evaluating the impact of filter-based feature selection in intrusion detection systems**  
> Zouhri, Idri & Ratnani (2024), *International Journal of Information Security*  
> [DOI 10.1007/s10207-023-00767-y](https://doi.org/10.1007/s10207-023-00767-y)

The paper is **not** a book chapter. You do not read it top-to-bottom on the first pass. The goal is to extract a **pipeline**: problem → data → methods → results → limits.

---

## How to read this paper (5-minute first pass)

| Step | Section | Goal |
|:-----|:--------|:-----|
| 1 | Title | Topic: feature selection in intrusion detection |
| 2 | Abstract | One-paragraph summary of everything |
| 3 | Research questions | What they actually test |
| 4 | Figures / tables | What won and what did not |
| 5 | Methodology (§5) | Experimental pipeline |
| 6 | Introduction | Context (read last) |

**Translation of the title:** they compare **filter-based feature selection** methods and ask whether reducing variables helps **classifiers** detect cyber-attacks.

---

## The core problem in one sentence

IDS datasets have **many features** (packet size, duration, protocol, bytes sent, …). Too many irrelevant or redundant features can cause **overfitting**, slower training, and worse generalization. The paper asks: **which filter methods + which classifiers + which thresholds work best?**

| IDS concept | Fraud-detection analogue (your assignment angle) |
|:------------|:------------------------------------------------|
| Attack vs benign | Fraud vs legitimate transaction |
| Network traffic features | TransactionAmt, card type, device info, V1–V339 |
| High false alarm rate | High false positives on normal users |

---

## Research questions (this is the map of the whole paper)

| RQ | Question (plain English) |
|:---|:-------------------------|
| **RQ1** | Does reducing features help or hurt classification? |
| **RQ2** | Do **univariate** filters beat **multivariate** filters? |
| **RQ3** | Which **filter + classifier** combinations work best? |
| **RQ4** | Are there features useful across **all** attack types? |

They test **228 model variants**:

\[
228 = 4\ \text{classifiers} \times 3\ \text{datasets} \times (5\ \text{univariate} \times 3\ \text{thresholds} + 3\ \text{multivariate} + \text{full feature set})
\]

---

## Feature selection vs feature extraction (PCA connection)

This distinction appears early in the paper and matters for your assignment.

| Approach | What it does | Keeps original columns? | Example |
|:---------|:-------------|:------------------------|:--------|
| **Feature selection** | Picks a **subset** of existing variables | Yes | Keep `TransactionAmt`, drop `V47` |
| **Feature extraction** | **Creates new** variables from combinations | No | PCA: \(PC_1 = 0.7X_1 + 0.3X_2\) |

**PCA is not feature selection.** PCA builds new components; filters like Chi-square or CFS **remove or rank original columns**.

---

## Three families of feature selection

| Type | Idea | Speed | Depends on classifier? | Paper examples |
|:-----|:-----|:------|:-----------------------|:---------------|
| **Filter** | Statistical score per feature or subset | Fast | No | Chi2, ANOVA, MI, Pearson, ReliefF, CFS, CON, DISR |
| **Wrapper** | Train model, try subsets, keep what improves performance | Slow | Yes | RFE (mentioned in related work, not main experiment) |
| **Embedded** | Selection inside the model | Medium | Built-in | XGBoost split importance, RF impurity |

**Your intuition about XGBoost:** partly correct. XGB is **not** a wrapper in this paper's taxonomy, but it **does** learn which splits matter internally. That is why external FS **sometimes does not help XGB** — it may already ignore noise, or FS may remove useful joint information.

---

## Filters used in the paper

### Univariate (one feature at a time)

| Code | Method | Question it answers |
|:-----|:-------|:-------------------|
| **K** | Chi-square | Is this feature **dependent** on the class? |
| **A** | ANOVA (F-test) | Do **class means** differ for this numeric feature? |
| **MI** | Mutual information | Does knowing the feature **reduce uncertainty** about the class? |
| **RL** | ReliefF | Does the feature separate **near neighbors** of different classes? |
| **C** | Pearson correlation | Linear correlation feature ↔ target |

Thresholds: keep top **20%, 40%, or 60%** of ranked features.

### Multivariate (subset at a time)

Based on **mRMR** (Maximum Relevance, Minimum Redundancy):

| Method | Logic |
|:-------|:------|
| **CFS** | High correlation with target, **low** correlation among selected features |
| **CON** | Subset with **minimal inconsistency** (same feature values but different class) |
| **DISR** | Features that together carry **more information** than the sum of parts |

---

## Classifiers compared

| Model | How it learns | Paper takeaway |
|:------|:--------------|:---------------|
| **SVM** | Maximum-margin boundary; sensitive to scale and noise | Often **benefits** from FS |
| **MLP** | Neural network; needs tuning and enough data | FS helps inconsistently |
| **RF** | Many trees vote on random subsets | Strong baseline; FS often helps |
| **XGB** | Sequential trees fix previous errors | Very strong; FS **not always** needed |

**RF vs XGB (simple analogy):**

```
Random Forest:     Tree1 ┐
                     Tree2 ├── vote
                     Tree3 ┘

XGBoost:           Tree1 → errors → Tree2 → errors → Tree3 → …
```

---

## Benchmark, Scott–Knott, Borda Count

- **Benchmark** here = same rules for everyone: same datasets, CV, metrics, hyperparameter search.
- **Scott–Knott (SK):** groups models whose performance differences are **not statistically meaningful** into clusters.
- **Borda Count (BC):** ranks models across **Accuracy, Precision, Recall, F1, AUC** so one metric does not dominate.

Example naming from the paper: `SVMRL40` = SVM trained on features selected by **ReliefF** at the **40%** threshold; `SVM100` = all original features.

---

## Main result (short version)

> Filter-based FS can reduce features without hurting detection, but **not always**. **XGBoost** and **Random Forest** with **multivariate** filters (**CON**, **DISR**) often perform very well. FS helps **SVM** and **RF** more often than **XGB** or **MLP**.

Feature selection is **not** universally better — it depends on **method + model + dataset**.

---

## MCAR, MAR, NMAR — before you select features

The paper's Step 1 is **cleaning**: remove missing values, duplicates, irrelevant columns. The paper does **not** define missing-data mechanisms, but you **must** understand them when applying the pipeline to **IEEE-CIS Fraud** or **Credit Card Fraud**.

These three terms describe **why** data are missing — not how to impute them.

### MCAR — Missing Completely At Random

Missingness has **nothing to do** with observed or unobserved values.

**Example (credit card):** a logging server crashes for 2 hours; **random** transactions lose `TransactionAmt`. Fraud and non-fraud rows are equally affected.

```
isFraud   TransactionAmt
0         120
1         450
0         NA    ← random outage, not related to fraud
```

**What you can do:** listwise deletion or simple imputation is less biased (still check sample size).

### MAR — Missing At Random

Missingness depends on **observed** variables, not on the missing value itself.

**Example:** `P_emaildomain` is missing **more often** when `ProductCD = 'WP'` (web purchase) — and you **see** `ProductCD` in the table. Missingness is explained by something you observe.

```
ProductCD   P_emaildomain   isFraud
WP          NA              0
W           user@gmail.com  0
WP          NA              1
```

**What you can do:** impute using other columns (group medians, models). Still need care in evaluation.

### NMAR — Not Missing At Random

Missingness depends on the **missing value itself** (or unobserved causes tied to it).

**Example:** very **large** `TransactionAmt` values are missing because high-value channels use a **different system** that was not merged into the dataset. The fact that the amount is large **causes** it to be missing.

```
TransactionAmt   isFraud
NA               1        ← amount might be 50,000; you never see it
85               0
120              0
```

**What you can do:** hardest case. Deleting rows or mean imputation can **bias** the model. You may need domain knowledge, sensitivity analysis, or separate modeling.

### Quick reference

| Mechanism | Missingness depends on… | Risk if ignored |
|:----------|:------------------------|:----------------|
| **MCAR** | Nothing systematic | Lower bias |
| **MAR** | Observed columns | Moderate; use informed imputation |
| **NMAR** | The hidden value itself | High bias; FS and models can look good on wrong data |

**Type I error reminder (from univariate tests):** if you run ANOVA or t-tests on **400 features** at \(\alpha = 0.05\), you expect ~20 false positives by chance. That is one reason the paper validates with **classifiers + cross-validation**, not only p-values.

---

## Mental template for any ML paper

1. What problem do they have?
2. What data do they use?
3. What methods do they compare?
4. How do they measure success?
5. What won?
6. What are the limitations?

For this paper:

| # | Answer |
|:--|:-------|
| 1 | Too many IDS features; need FS |
| 2 | CIC-IDS2017, CSE-CIC-IDS2018, CIC-ToN-IoT |
| 3 | 5 univariate + 3 multivariate filters × 4 classifiers |
| 4 | 10-fold CV; Accuracy, Precision, Recall, F1, AUC; SK + Borda |
| 5 | RF/XGB + multivariate filters often strong |
| 6 | Old-style IDS focus; no universal FS winner |

---

## My reproduction plan (finance / fraud)

Same pipeline, different domain:

```
Public fraud dataset (Credit Card or IEEE-CIS)
    → cleaning + MCAR/MAR check
    → encoding
    → scaling (for SVM / PCA)
    → univariate FS (Chi2, ANOVA, MI, Pearson, ReliefF)
    → multivariate FS (CFS-like, CON concept, DISR concept)
    → RF, XGB, SVM
    → metrics (Precision, Recall, F1, ROC-AUC, PR-AUC)
    → compare
```

Follow-up posts in this series:

- [Univariate feature selection (Chi2, ANOVA, MI, Pearson, ReliefF)](/2026/05/23/dana-4830-univariate-feature-selection/)
- [Multivariate feature selection — Part 1 (CFS, mRMR)](/2026/05/24/dana-4830-multivariate-feature-selection-part1/)
- [Multivariate feature selection — Part 2 (CON, DISR, full pipeline)](/2026/05/25/dana-4830-multivariate-feature-selection-part2/)

---

## References

- Zouhri, H., Idri, A., & Ratnani, A. (2024). Evaluating the impact of filter-based feature selection in intrusion detection systems. *International Journal of Information Security*, 23, 759–785.
- Course paper PDF: `W2_Sec1_Feature_Selection_Paper_1.pdf`
- Kaggle — [Credit Card Fraud Detection](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud) (good starter size)
- Kaggle — [IEEE-CIS Fraud Detection](https://www.kaggle.com/c/ieee-fraud-detection) (assignment-scale dataset)

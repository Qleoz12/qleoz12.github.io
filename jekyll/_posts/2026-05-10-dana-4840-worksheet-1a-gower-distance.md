---
title: "DANA 4840 — Worksheet 1a: Gower distance for mixed data"
search: false
categories:
  - Statistics
date: 2026-05-10
last_modified_at: 2026-05-10T20:00:00-06:00
share: linkedin
math: true
---

Study sheet for **DANA 4840 — Worksheet 1a**. Display math below uses **MathJax** (enabled on this page with `math: true` in the front matter).

The worksheet uses a **mixed** table: quantitative fields, nominal categories, and a symmetric binary flag. **Gower distance** is appropriate because it builds a **normalized dissimilarity between 0 and 1** for each active variable and then **averages** those contributions (equal weight when there are no missing values).

- For **quantitative** variables, the contribution is **\(|x_1 - x_2|\)** divided by the **observed range** (max − min) on that column, using **all rows** in the dataset.
- For **categorical** and **symmetric binary** variables, the contribution is **0** if the two values match and **1** if they differ.

## Dataset

| Employee   | Age | Race | Height   | Income | IsMale | Politics     |
|------------|-----|------|----------|--------|--------|--------------|
| Employee 1 | 22  | 1    | Tall     | 0.39   | TRUE   | moderate     |
| Employee 2 | 33  | 3    | Short    | 0.34   | TRUE   | liberal      |
| Employee 3 | 52  | 1    | Moderate | 0.51   | FALSE  | moderate     |
| Employee 4 | 46  | 6    | Tall     | 0.63   | TRUE   | conservative |

**Source (adapted):** [McCaffrey — example of calculating the Gower distance](https://jamesmccaffrey.wordpress.com/2020/04/21/example-of-calculating-the-gower-distance/)

## Variable types used in the analysis

| Variable   | Type | Reason |
|------------|------|--------|
| **Age**    | Quantitative (interval) | Absolute difference scaled by the **observed range** across the four employees. |
| **Race**   | Nominal categorical | Codes **1, 3, 1, 6** are labels, not a continuous numeric scale — store as `factor` in R. |
| **Height** | Categorical | Different labels contribute **1** (here: unordered factor, consistent with `daisy` defaults). |
| **Income** | Quantitative (interval) | Same scaling rule as **Age**. |
| **IsMale** | Symmetric binary | Same value → 0; different value → 1. |
| **Politics** | Nominal categorical | Same category → 0; different category → 1. |

## (a) Gower distance between Employee 1 and Employee 2

**Worksheet 1a — (a)**

The dataset contains mixed data (quantitative and categorical variables). Calculate by hand the Gower distance between Employee 1 and Employee 2, showing all steps of how you arrive at your answer.

**Employee 1:** Age = 22, Race = 1, Height = Tall, Income = 0.39, IsMale = TRUE, Politics = moderate.  
**Employee 2:** Age = 33, Race = 3, Height = Short, Income = 0.34, IsMale = TRUE, Politics = liberal.

### Step 1: Ranges for quantitative variables

Use **all four** employees to set each range.

<div class="math-block" markdown="0">
\[
\begin{aligned}
R_{\mathrm{Age}} &= 52 - 22 = 30 \\[0.35em]
R_{\mathrm{Income}} &= 0.63 - 0.34 = 0.29
\end{aligned}
\]
</div>

### Step 2: Variable-by-variable contributions (Employees 1 vs 2)

| Variable   | Calculation | Contribution |
|------------|-------------|--------------|
| **Age**    | \|22 − 33\| / 30 = 11/30 | ≈ **0.3667** |
| **Race**   | different categories | **1** |
| **Height** | Tall vs Short | **1** |
| **Income** | \|0.39 − 0.34\| / 0.29 = 5/29 | ≈ **0.1724** |
| **IsMale** | TRUE vs TRUE | **0** |
| **Politics** | moderate vs liberal | **1** |

### Step 3: Average the six contributions

<div class="math-block" markdown="0">
\[
\begin{aligned}
D_{\mathrm{Gower}}(1,2) &= \frac{0.3667 + 1 + 1 + 0.1724 + 0 + 1}{6} \\[0.45em]
&= \frac{3.5391}{6} \\[0.45em]
&\approx 0.5898
\end{aligned}
\]
</div>

Exact rational form (optional):

<div class="math-block" markdown="0">
\[
D_{\mathrm{Gower}}(1,2) = \frac{3079}{5220} \approx 0.589847
\]
</div>

So Employees **1** and **2** are **moderately dissimilar** when all six variables enter with equal weight.

*(If **Height** is treated as an **ordered** factor with Short &lt; Moderate &lt; Tall, `daisy` still assigns contribution **1** for Tall vs Short in this small dataset because that pair spans the full spread of observed ordered levels.)*

## (b) Check with `daisy()`

**Worksheet 1a — (b)**

Use R’s `daisy()` to validate that your answer in part (a) is correct.

Build the `data.frame` with sensible types: `Race`, `Height`, and `Politics` as **`factor`**; `IsMale` as logical; `Age` and `Income` numeric. With `metric = "gower"`, `daisy()` applies range scaling on numeric columns and 0/1 contributions on categorical columns as in the table above.

{% capture d4840_ws1a_b_code %}
```r
# =========================
# Worksheet 1a — (b)
# =========================
library(cluster)

employees <- data.frame(
  Age = c(22, 33, 52, 46),
  Race = factor(c(1, 3, 1, 6)),
  Height = factor(c("Tall", "Short", "Moderate", "Tall")),
  Income = c(0.39, 0.34, 0.51, 0.63),
  IsMale = c(TRUE, TRUE, FALSE, TRUE),
  Politics = factor(c("moderate", "liberal", "moderate", "conservative")),
  row.names = paste0("Employee", 1:4)
)

D <- as.matrix(daisy(employees, metric = "gower"))

round(D, 6)

D["Employee1", "Employee2"]

3079 / 5220

isTRUE(all.equal(D["Employee1", "Employee2"], 3079 / 5220))
```
{% endcapture %}

{% capture d4840_ws1a_b_out %}
```text
          Employee1 Employee2 Employee3 Employee4
Employee1  0.000000  0.589847  0.568966  0.604598
Employee2  0.589847  0.000000  0.869923  0.738889
Employee3  0.568966  0.869923  0.000000  0.768966
Employee4  0.604598  0.738889  0.768966  0.000000

[1] 0.5898467

[1] 0.5898467

[1] TRUE
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_ws1a_b_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_ws1a_b_out %}
</div>

Floating-point noise can make raw `==` checks fail even when the hand calculation matches; **`isTRUE(all.equal(...))`** is the reliable check in R.

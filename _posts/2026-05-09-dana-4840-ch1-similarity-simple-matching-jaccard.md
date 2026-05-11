---
title: "DANA 4840 — Worksheet Ch.1: Simple Matching, Jaccard, shoppers"
search: false
categories:
  - Statistics
date: 2026-05-09
last_modified_at: 2026-05-10T20:00:00-06:00
share: linkedin
math: true
---

Study sheet for **DANA 4840** — Chapter 1: similarity for binary-coded shoppers (Simple Matching, optional `daisy()` check), plus the lecture block on similarity vs distance and Gower for mixed data.

## DANA 4840 — Classification II — Cluster Analysis — Part 2

### Use cases of cluster analysis

Cluster analysis is used in many settings, for example:

- City planners segment neighborhoods (for example property-tax bands or service planning).
- A large firm may group thousands of employees to target **training** or **promotion** decisions.

### Similarity vs dissimilarity measurements

- **Similarity** increases when two objects are **more alike** (e.g. Jaccard, Dice, Simple Matching on a **0–1** scale).
- **Dissimilarity / distance** decreases when two objects are **more alike** (e.g. Euclidean or Manhattan distance).

### Methods to calculate similarity and dissimilarity measurements

**(a) Binary data (0/1 coding)** — usually **similarity** measures:

1. Simple Matching (SMC)  
2. Jaccard  
3. Dice  

**(b) Quantitative data** — usually **dissimilarities / distances**:

1. Euclidean distance  
2. Manhattan distance  
3. Correlation-based distances  

**(c) Mixed data** (quantitative and categorical together): **Gower distance**. In R, use `cluster::daisy()` with explicit variable types.

### Turning similarity into dissimilarity (and why)

Many clustering algorithms expect a **dissimilarity matrix** or work directly with **distances**. If a similarity **s** is scaled between **0** and **1** with **1 = identical**, a common transform is:

**d = 1 − s**

so **d = 0** for identical objects and larger **d** means more different. Always check the scale of **s** before applying a transform.

### Simple Matching, Jaccard, and Dice (definitions)

For two objects *i* and *j* and **p** binary attributes, count four kinds of position-wise pairs:

| Symbol | Meaning (one position) |
|--------|-------------------------|
| **a** | both have **1** |
| **b** | *i* has **1**, *j* has **0** |
| **c** | *i* has **0**, *j* has **1** |
| **d** | both have **0** |

and **p = a + b + c + d**.

**Simple Matching (SMC)** — similarity from **all agreements** (both **1–1** and **0–0**):

<div class="math-block" markdown="0">
\[
S_{\mathrm{SMC}} = \frac{a+d}{a+b+c+d} = \frac{a+d}{p}
\]
</div>

**Jaccard** — ignores **double zeros** (only joint “presence” counts as a strong agreement):

<div class="math-block" markdown="0">
\[
J = \frac{a}{a+b+c}
\]
</div>

**Dice** — another presence-based similarity; differs from Jaccard in how double zeros are weighted:

<div class="math-block" markdown="0">
\[
\text{Dice} = \frac{2a}{2a+b+c}
\]
</div>

For the **shoppers** worksheet we use **SMC** with **p = 7** bits (ethnicity encoded with two dummies).

---

## Dataset (shoppers)

| Shopper   | Tall or short | Body size heavy-set or not | Suspected ethnic background | Made purchases or not | Shop alone or not | Fashion conscious or not |
|-----------|---------------|----------------------------|-----------------------------|------------------------|-------------------|--------------------------|
| Shopper 1 | Short         | Not                        | Caucasian                   | Yes                    | Alone             | Fashionable              |
| Shopper 2 | Tall          | Heavy                      | Chinese                     | No                     | Alone             | Not                      |
| Shopper 3 | Short         | Heavy                      | Indian                      | Yes                    | Alone             | Not                      |
| Shopper 4 | Short         | Not                        | Chinese                     | No                     | Alone             | Fashionable              |
| Shopper 5 | Tall          | Heavy                      | Chinese                     | No                     | Not               | Not                      |

### Binary coding (for parts (a) and (b))

Six survey items become **seven** binary columns: ethnicity with **three** categories needs **two dummy bits** (Caucasian reference `(0,0)`; Chinese `(1,0)`; Indian `(0,1)`).

| Bit | Variable | Coding |
|-----|----------|--------|
| 1   | Tall or short | Tall = 1, Short = 0 |
| 2   | Heavy-set or not | Heavy = 1, Not = 0 |
| 3–4 | Ethnic background (two dummies) | Chinese = (1,0), Indian = (0,1), Caucasian = (0,0) |
| 5   | Made purchases | Yes = 1, No = 0 |
| 6   | Shop alone | Alone = 1, Not alone = 0 |
| 7   | Fashion conscious | Fashionable = 1, Not = 0 |

**Binary matrix 5 × 7** (rows = shoppers 1…5):

```text
     [,1] [,2] [,3] [,4] [,5] [,6] [,7]
[1,]    0    0    0    0    1    1    1
[2,]    1    1    1    0    0    1    0
[3,]    0    1    0    1    1    1    0
[4,]    0    0    1    0    0    1    1
[5,]    1    1    1    0    0    0    0
```

### (a)

**Worksheet Ch 1 — (a)**

By introducing appropriate binary variables, calculate Simple Matching similarity coefficient for all pairs of shoppers. Present your final answer in a 5 × 5 matrix.

*(You will need extra writing space to complete your work as this part requires lots of working.)*

**Worked solution (sketch):** For binary rows **i** and **j**, Simple Matching is **(matches) / p** with **p = 7** bits. Diagonal entries are **1**.

<div class="math-block" markdown="0">
\[
S_{\mathrm{SMC}}(i,j) = \frac{\text{\# positions where row } i \text{ equals row } j}{7}
\]
</div>

Each cell shows the exact fraction **k/7**. **Hover** a cell to see the decimal in the browser tooltip (`title`).

<div class="dana-ch1-smc-wrap" markdown="0">
<style>
.dana-ch1-smc-wrap table { border-collapse: collapse; margin: 1rem auto; font-size: 0.95rem; box-shadow: 0 1px 4px rgba(0,0,0,.12); }
.dana-ch1-smc-wrap th, .dana-ch1-smc-wrap td { border: 1px solid rgba(0,0,0,.15); padding: 0.55rem 0.85rem; text-align: center; min-width: 3.1rem; }
.dana-ch1-smc-wrap th { background: #f8f9fa; font-weight: 600; }
.dana-ch1-smc-wrap td { font-weight: 600; font-variant-numeric: tabular-nums; cursor: default; }
.dana-ch1-smc-wrap .legend { font-size: 0.88rem; color: #444; max-width: 36rem; margin: 0.5rem auto 0; text-align: center; }
</style>
<table aria-label="SMC similarity matrix, fractions k over 7">
  <thead>
    <tr><th></th><th scope="col">S1</th><th scope="col">S2</th><th scope="col">S3</th><th scope="col">S4</th><th scope="col">S5</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">S1</th><td style="background:#d73027;color:#fff" title="S1 vs S1: 7/7 = 1.000">7/7</td><td style="background:#6e618b;color:#fff" title="S1 vs S2: 2/7 ≈ 0.286">2/7</td><td style="background:#984d63;color:#fff" title="S1 vs S3: 4/7 ≈ 0.571">4/7</td><td style="background:#ad434f;color:#fff" title="S1 vs S4: 5/7 ≈ 0.714">5/7</td><td style="background:#596b9f;color:#fff" title="S1 vs S5: 1/7 ≈ 0.143">1/7</td></tr>
    <tr><th scope="row">S2</th><td style="background:#6e618b;color:#fff" title="S2 vs S1: 2/7 ≈ 0.286">2/7</td><td style="background:#d73027;color:#fff" title="S2 vs S2: 7/7 = 1.000">7/7</td><td style="background:#835777;color:#fff" title="S2 vs S3: 3/7 ≈ 0.429">3/7</td><td style="background:#984d63;color:#fff" title="S2 vs S4: 4/7 ≈ 0.571">4/7</td><td style="background:#c2393b;color:#fff" title="S2 vs S5: 6/7 ≈ 0.857">6/7</td></tr>
    <tr><th scope="row">S3</th><td style="background:#984d63;color:#fff" title="S3 vs S1: 4/7 ≈ 0.571">4/7</td><td style="background:#835777;color:#fff" title="S3 vs S2: 3/7 ≈ 0.429">3/7</td><td style="background:#d73027;color:#fff" title="S3 vs S3: 7/7 = 1.000">7/7</td><td style="background:#6e618b;color:#fff" title="S3 vs S4: 2/7 ≈ 0.286">2/7</td><td style="background:#6e618b;color:#fff" title="S3 vs S5: 2/7 ≈ 0.286">2/7</td></tr>
    <tr><th scope="row">S4</th><td style="background:#ad434f;color:#fff" title="S4 vs S1: 5/7 ≈ 0.714">5/7</td><td style="background:#984d63;color:#fff" title="S4 vs S2: 4/7 ≈ 0.571">4/7</td><td style="background:#6e618b;color:#fff" title="S4 vs S3: 2/7 ≈ 0.286">2/7</td><td style="background:#d73027;color:#fff" title="S4 vs S4: 7/7 = 1.000">7/7</td><td style="background:#835777;color:#fff" title="S4 vs S5: 3/7 ≈ 0.429">3/7</td></tr>
    <tr><th scope="row">S5</th><td style="background:#596b9f;color:#fff" title="S5 vs S1: 1/7 ≈ 0.143">1/7</td><td style="background:#c2393b;color:#fff" title="S5 vs S2: 6/7 ≈ 0.857">6/7</td><td style="background:#6e618b;color:#fff" title="S5 vs S3: 2/7 ≈ 0.286">2/7</td><td style="background:#835777;color:#fff" title="S5 vs S4: 3/7 ≈ 0.429">3/7</td><td style="background:#d73027;color:#fff" title="S5 vs S5: 7/7 = 1.000">7/7</td></tr>
  </tbody>
</table>
<p class="legend">Scale: <strong style="color:#4575b4">cool (low similarity)</strong> → <strong style="color:#d73027">warm (high similarity)</strong>. Decimals appear only in the tooltip.</p>
</div>

Numeric matrix (4 decimals), equivalent:

```text
        S1     S2     S3     S4     S5
S1  1.0000 0.2857 0.5714 0.7143 0.1429
S2  0.2857 1.0000 0.4286 0.5714 0.8571
S3  0.5714 0.4286 1.0000 0.2857 0.2857
S4  0.7143 0.5714 0.2857 1.0000 0.4286
S5  0.1429 0.8571 0.2857 0.4286 1.0000
```

### (b)

**Worksheet Ch 1 — (b)**

Use R’s `daisy()` to validate that your answer in part (a) is correct.

**Worked notes:** With **symmetric binary** columns, Gower dissimilarity equals the **fraction of positions where the two rows disagree**. Therefore:

<div class="math-block" markdown="0">
\[
S_{\mathrm{SMC}}(i,j) = 1 - d_{\mathrm{Gower}}(i,j)
\]
</div>

Declare all seven columns as **`symm`** in `daisy()`.

### Note: `outer()` + `Vectorize()` — odd-looking, but not “matrix subtraction”

The optional snippet

```r
outer(1:5, 1:5, Vectorize(function(i, j) mean(shop_bin[i, ] == shop_bin[j, ])))
```

is **not** mysterious matrix algebra: it visits **every pair of row indices (i, j)** and stores the **fraction of matching columns** (that is the SMC). `outer(X, Y, FUN)` builds the grid of combinations; **`Vectorize()`** wraps `f(i, j)` so `outer` can call it **scalar-by-scalar** and return the 5×5 matrix. A double `for (i) for (j)` loop would give the same numbers.

### Note: `max(abs(S_daisy - S_manual))` — what it reports

`S_daisy` and `S_manual` are both **5×5**. **`S_daisy - S_manual`** is **element-wise** subtraction (not matrix multiplication). `abs(...)` takes absolute differences and **`max(...)`** is the **largest** of the 25 cells.

You will **rarely see exactly 0**: R uses **floating-point** arithmetic, and different code paths (`mean(…==…)` vs `daisy` plus subtraction) can leave differences around **10⁻¹⁶** (e.g. `1.110223e-16`). That is **machine noise**, not a mistake in the worksheet. For equality testing, use **`isTRUE(all.equal(S_daisy, S_manual))`**, which should return **`TRUE`**.

{% capture d4840_ch1_b_code %}
```r
# =========================
# Worksheet Ch 1 — (b)
# =========================
library(cluster)

shop_bin <- matrix(
  c(
    0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 0, 0, 1, 0,
    0, 1, 0, 1, 1, 1, 0,
    0, 0, 1, 0, 0, 1, 1,
    1, 1, 1, 0, 0, 0, 0
  ),
  nrow = 5,
  byrow = TRUE
)

colnames(shop_bin) <- c(
  "tall", "heavy", "eth_chinese", "eth_indian",
  "purchase", "alone", "fashion"
)
rownames(shop_bin) <- paste0("Shopper", 1:5)

p <- ncol(shop_bin)

D <- as.matrix(daisy(shop_bin, type = list(symm = 1:p)))

S_daisy <- 1 - D

round(S_daisy, 4)

# SMC “a mano”: misma idea que un doble bucle for (i) for (j).
# outer() + Vectorize(): ver nota arriba en el post.
S_manual <- outer(
  1:5,
  1:5,
  Vectorize(function(i, j) mean(shop_bin[i, ] == shop_bin[j, ]))
)
round(S_manual, 4)

# Matriz de errores |S_daisy - S_manual| celda a celda; max = peor discrepancia.
# Suele ser ~1e-16 (no 0): coma flotante, no un error del worksheet.
print(max(abs(S_daisy - S_manual)))
# Comparación “estadística” recomendada en R (tolerancia por .Machine$double.eps^0.5):
isTRUE(all.equal(S_daisy, S_manual))
```
{% endcapture %}

{% capture d4840_ch1_b_out %}
```text
        Shopper1 Shopper2 Shopper3 Shopper4 Shopper5
Shopper1   1.0000   0.2857   0.5714   0.7143   0.1429
Shopper2   0.2857   1.0000   0.4286   0.5714   0.8571
Shopper3   0.5714   0.4286   1.0000   0.2857   0.2857
Shopper4   0.7143   0.5714   0.2857   1.0000   0.4286
Shopper5   0.1429   0.8571   0.2857   0.4286   1.0000

        Shopper1 Shopper2 Shopper3 Shopper4 Shopper5
Shopper1   1.0000   0.2857   0.5714   0.7143   0.1429
Shopper2   0.2857   1.0000   0.4286   0.5714   0.8571
Shopper3   0.5714   0.4286   1.0000   0.2857   0.2857
Shopper4   0.7143   0.5714   0.2857   1.0000   0.4286
Shopper5   0.1429   0.8571   0.2857   0.4286   1.0000

[1] 1.110223e-16
[1] TRUE
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_ch1_b_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_ch1_b_out %}
</div>

### (c)

**Worksheet Ch 1 — (c)**

Which two shoppers are the most similar based on your answer in part (a)?

**Answer:** **Shoppers 2 and 5** — similarity **6/7 ≈ 0.857** (they match on 6 of 7 attributes; they differ only on *shop alone*).

### (d)

**Worksheet Ch 1 — (d)**

Which two shoppers are the least similar?

**Answer:** **Shoppers 1 and 5** — similarity **1/7 ≈ 0.143** (only one matching bit out of seven).

### (e)

**Worksheet Ch 1 — (e)**

If you were to divide these 5 shoppers into two relatively homogenous subgroups (clusters) based on the similarity numbers calculated in part (a), how will you form the two subgroups?

**Answer (one reasonable split):**

- **Cluster A — Shoppers 2 and 5:** strongest pair (**6/7**); both *Tall*, *Heavy*, *Chinese*, no purchase, not *fashion conscious* (they differ only on shopping alone).
- **Cluster B — Shoppers 1, 3, and 4:** all *Short*; internal similarity is weaker (e.g. 3 vs 4 is only **2/7**), but the split contrasts “all Short” profiles against the “Tall + Heavy + Chinese” block.

*(Other partitions are defensible if the course prescribes a different clustering rule.)*

### (f)

**Worksheet Ch 1 — (f)**

Would Simple Matching similarity coefficient or Jaccard similarity coefficient be more suitable for this dataset? Explain.

**Answer:** **Simple Matching** fits better here: every **0** and **1** is meaningful, and **0–0 agreements** should count.

**Jaccard** for binary data often **drops double zeros** (it emphasizes joint “presence”). That makes sense when **0** is not comparable to **1**. In this worksheet both levels are symmetric categories, so **SMC** matches the question better.

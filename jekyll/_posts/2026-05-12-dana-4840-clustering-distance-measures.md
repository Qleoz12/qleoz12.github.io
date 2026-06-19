---
title: "DANA 4840 — Distance measures (Euclidean, Pearson correlation, Gower / daisy)"
search: false
categories:
  - Statistics
date: 2026-05-12
last_modified_at: 2026-05-13T12:00:00-06:00
share: linkedin
math: true
---

Clustering uses **distances** (or dissimilarities) between objects. Below: **`scale`** numeric rows, **Euclidean** distance with **`dist`**, **Pearson-style** distances between row profiles, **Gower** with **`daisy`** on mixed data, and an optional **`fviz_dist`** heatmap. Examples use **`USArrests`** (15 rows) and **`flower`**.

**`set.seed()`** makes random sampling repeatable. **`sample(1:50, 15)`** chooses **15 row indices** from `USArrests` (whole rows, not fifteen cells from one row). **`ss`** stores those indices; **`df`** is the subset **`USArrests[ss, ]`**. Comments after **`#`** mark each step.

---

## Random subset of rows (`USArrests`)

{% capture d4840_dist_ss_code %}
```r
set.seed(123)                           # Repetible
ss <- sample(1:50, 15)                  # 15 filas (índices), sin repetir
ss                                      # números de fila en USArrests
df <- USArrests[ss, ]                   # mismo orden que ss; sigue usando df (sin idx) para scale()
cbind(idx = ss, df)                     # tabla de lectura: idx + estado + datos
```
{% endcapture %}

{% capture d4840_dist_ss_out %}
```text
 [1] 31 15 14  3 42 43 37 48 25 26 27  5 40 28  9

               idx Murder Assault UrbanPop Rape
New Mexico      31   11.4     285       70 32.1
Iowa            15    2.2      56       57 11.3
Indiana         14    7.2     113       65 21.0
Arizona          3    8.1     294       80 31.0
Tennessee       42   13.2     188       59 26.9
Texas           43   12.7     201       80 25.5
Oregon          37    4.9     159       67 29.3
West Virginia   48    5.7      81       39  9.3
Missouri        25    9.0     178       70 28.2
Montana         26    6.0     109       53 16.4
Nebraska        27    4.3     102       62 16.5
California       5    9.0     276       91 40.6
South Carolina  40   14.4     279       48 22.5
Nevada          28   12.2     252       81 46.0
Florida          9   15.4     335       80 31.9
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_dist_ss_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_dist_ss_out %}
</div>

The **`idx`** column is that state’s **row number in the full `USArrests` matrix** (50 states, fixed order in R). Rows appear **in `ss` order**: first printed row matches **`ss[1]`** (31 → New Mexico), last matches **`ss[15]`** (9 → Florida). **`scale(df)`** below still uses **`df`** without **`idx`**, so only the four crime variables are scaled.

---

## Standardize before comparing numeric profiles

**`scale(df)`** subtracts each column mean and divides by its standard deviation **for these rows only**, so variables on different scales are more comparable.

{% capture d4840_dist_subset_code %}
```r
df.scaled <- scale(df)                  # Centrar y escalar cada columna
df.scaled                               # attr: centros y escalas usados
```
{% endcapture %}

{% capture d4840_dist_subset_out %}
```text
                    Murder     Assault    UrbanPop        Rape
New Mexico      0.58508090  1.02300309  0.22505574  0.61101857
Iowa           -1.70220419 -1.54760088 -0.68923319 -1.43885018
Indiana        -0.45911447 -0.90775622 -0.12659385 -0.48290177
Arizona        -0.23535832  1.12403120  0.92835492  0.50261205
Tennessee       1.03259320 -0.06585536 -0.54857336  0.09855138
Texas           0.90828422  0.08007413  0.92835492 -0.03942055
Oregon         -1.03093574 -0.39139036  0.01406598  0.33507470
West Virginia  -0.83204139 -1.26696726 -1.95517172 -1.63595295
Missouri       -0.01160217 -0.17810880  0.22505574  0.22666818
Montana        -0.75745600 -0.95265760 -0.97055287 -0.93623813
Nebraska       -1.18010651 -1.03123501 -0.33758361 -0.92638299
California     -0.01160217  0.92197499  1.70198401  1.44870532
South Carolina  1.33093473  0.95565102 -1.32220246 -0.33507470
Nevada          0.78397525  0.65256671  0.99868483  1.98088278
Florida         1.57955267  1.58427034  0.92835492  0.59130829
attr(,"scaled:center")
    Murder    Assault   UrbanPop       Rape 
  9.046667 193.866667  66.800000  25.900000 
attr(,"scaled:scale")
   Murder   Assault  UrbanPop      Rape 
 4.022236 89.084123 14.218700 10.146991 
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_dist_subset_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_dist_subset_out %}
</div>

---

## Euclidean distance between rows (`dist`)

`dist()` computes **pairwise distances between rows**. The full object stores **`choose(15,2) = 105`** distances; below is the **`3×3`** corner rounded to one decimal.

{% capture d4840_dist_eucl_code %}
```r
dist.eucl <- dist(df.scaled, method = "euclidean")
round(as.matrix(dist.eucl)[1:3, 1:3], 1)             # esquina 3×3; 105 pares en total
```
{% endcapture %}

{% capture d4840_dist_eucl_out %}
```text
           New Mexico Iowa Indiana
New Mexico        0.0  4.1     2.5
Iowa              4.1  0.0     1.8
Indiana           2.5  1.8     0.0
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_dist_eucl_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_dist_eucl_out %}
</div>

**Between variables instead of rows:** transpose first — **`dist(t(df.scaled))`** — so each **column** becomes a row profile.

### Manual check: New Mexico vs Iowa (scaled rows)

For two profiles **x** and **y** (here four standardized variables), Euclidean distance is:

<div class="math-block" markdown="0">
\[
d(\mathbf{x},\mathbf{y}) = \sqrt{\sum_{j=1}^{4} (x_j - y_j)^2}.
\]
</div>

Using the first two rows of **`df.scaled`** in this run (**New Mexico** then **Iowa**):

| Row | Murder | Assault | UrbanPop | Rape |
|-----|--------|---------|----------|------|
| **New Mexico** | 0.58508090 | 1.02300309 | 0.22505574 | 0.61101857 |
| **Iowa** | −1.70220419 | −1.54760088 | −0.68923319 | −1.43885018 |
| **Difference \(x_j-y_j\)** | 2.28728509 | 2.57060397 | 0.91428893 | 2.04986875 |
| **Squared** | 5.23167308 | 6.60800477 | 0.83592425 | 4.20196189 |

Sum of squared differences ≈ **16.877564** → \(d = \sqrt{16.877564} \approx\) **4.108231**. That matches **`dist(df.scaled, method = "euclidean")`** between those two rows at full precision; **`round(..., 1)`** gives **4.1**, same as the corner matrix above.

{% capture d4840_dist_manual_verify_code %}
```r
sqrt(sum((df.scaled["New Mexico", ] - df.scaled["Iowa", ])^2))
```
{% endcapture %}

{% capture d4840_dist_manual_verify_out %}
```text
[1] 4.108231
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code (sanity check)" body=d4840_dist_manual_verify_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_dist_manual_verify_out %}
</div>

*(Rounding in the output panel may show fewer decimals; the stored value is **4.108231249**.)*

---

## Pearson correlation distance between rows

**`factoextra::get_dist(..., method = "pearson")`** builds distances from **similarity of shape** across variables (high correlation ⇒ low distance). The same idea appears in base R as **`1 − cor(t(df.scaled))`** between rows (diagonal set to zero). If you do not use **`factoextra`**, the base-R version is enough for the concept.

{% capture d4840_dist_pearson_code %}
```r
dist.cor <- factoextra::get_dist(df.scaled, method = "pearson")
round(as.matrix(dist.cor)[1:3, 1:3], 1)
```
{% endcapture %}

{% capture d4840_dist_pearson_alt_code %}
```r
cc <- cor(t(df.scaled))
Dpear <- 1 - cc
diag(Dpear) <- 0
round(Dpear[1:3, 1:3], 1)
```
{% endcapture %}

{% capture d4840_dist_pearson_out %}
```text
           New Mexico Iowa Indiana
New Mexico        0.0  1.7     2.0
Iowa              1.7  0.0     0.3
Indiana           2.0  0.3     0.0
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code (factoextra)" body=d4840_dist_pearson_code %}
{% include r_panel.html kind="code" label="R code (base R)" body=d4840_dist_pearson_alt_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_dist_pearson_out %}
</div>

---

## Gower / `daisy()` on mixed `flower` data

{% capture d4840_dist_flower_code %}
```r
library(cluster)
data(flower)
head(flower, 3)
str(flower)

dd <- daisy(flower)
round(as.matrix(dd)[1:3, 1:3], 2)
```
{% endcapture %}

{% capture d4840_dist_flower_out %}
```text
  V1 V2 V3 V4 V5 V6  V7 V8
1  0  1  1  4  3 15  25 15
2  1  0  0  2  1  3 150 50
3  0  1  0  3  3  1 150 50

'data.frame':	18 obs. of  8 variables:
 $ V1: Factor w/ 2 levels "0","1": 1 2 1 1 1 1 1 1 2 2 ...
 $ V2: Factor w/ 2 levels "0","1": 2 1 2 1 2 2 1 1 2 2 ...
 $ V3: Factor w/ 2 levels "0","1": 2 1 1 2 1 1 1 2 1 1 ...
 $ V4: Factor w/ 5 levels "1","2","3","4",..: 4 2 3 4 5 4 4 2 3 5 ...
 $ V5: Ord.factor w/ 3 levels "1"<"2"<"3": 3 1 3 2 2 3 3 2 1 2 ...
 $ V6: Ord.factor w/ 18 levels "1"<"2"<"3"<"4"<..: 15 3 1 16 2 12 13 7 4 14 ...
 $ V7: num  25 150 150 125 20 50 40 100 25 100 ...
 $ V8: num  15 50 50 50 15 40 20 15 15 60 ...

     1    2    3
1 0.00 0.89 0.53
2 0.89 0.00 0.51
3 0.53 0.51 0.00
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_dist_flower_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_dist_flower_out %}
</div>

---

## Visualize a distance matrix (`fviz_dist`)

**`fviz_dist()`** draws the distance matrix as a heatmap (dark/light by dissimilarity). It comes from **`factoextra`** (and **`ggplot2`** underneath).

{% capture d4840_dist_viz_code %}
```r
factoextra::fviz_dist(dist.eucl)
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_dist_viz_code %}
</div>

---

## See also

- **Similarity for binary data** — Simple Matching, Jaccard, and validating with `daisy` on a small example.
- **Gower distance on mixed variables** — step-by-step arithmetic before using `daisy` in code.
- **Clustering tendency** — quick checks (PCA look, Hopkins statistic, distance-matrix plot) before trusting a partition.

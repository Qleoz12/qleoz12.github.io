---
title: "DANA 4840 — K-means (MacQueen): Worksheet 2, two variables and WSS"
search: false
categories:
  - Statistics
date: 2026-05-18
last_modified_at: 2026-05-19T12:00:00-06:00
share: linkedin
math: true
---

**K-means** partitions points into **k** groups by alternating: assign each point to the **nearest centroid**, then **recompute centroids** as the mean of their members. With **MacQueen’s** rule (R option `algorithm = "MacQueen"`), updates follow that textbook sequence.

For **two centers**, `kmeans(..., centers = 2)` picks starting centers **at random**. To fix centres **exactly** at observations **A** and **C**, pass **`centers`** as a **2 × p matrix** whose rows are those coordinates (see `?kmeans`, argument **`centers`**).

## Data (four items, two features)

| Item | x1 | x2 |
|:-----|---:|---:|
| A | 5 | 3 |
| B | −1 | 1 |
| C | 1 | −2 |
| D | −3 | −2 |

**Initial centroids:** row **A** → (5, 3); row **C** → (1, −2).

Squared Euclidean distance  
\(d^2(\mathbf{x},\mathbf{c}) = (x_1-c_1)^2 + (x_2-c_2)^2\)  
gives the same nearest-centre decisions as ordinary Euclidean distance.

### Distances from each item to A and to C

| Item | \(d^2\) to A (5,3) | \(d^2\) to C (1,−2) | Nearest |
|:-----|------------------:|-------------------:|:--------|
| A | 0 | 41 | A |
| B | 40 | 13 | C |
| C | 41 | 0 | C |
| D | 89 | 16 | C |

Example **B:** \((-1-5)^2 + (1-3)^2 = 36+4 = 40\) to A; \((-1-1)^2 + (1+2)^2 = 4+9 = 13\) to C ⇒ cluster of **C**.

### First assignment

| Cluster | Members |
|:--------|:--------|
| 1 | A |
| 2 | B, C, D |

### Update centroids

Cluster 1 mean: **(5, 3)** (only A).  
Cluster 2 mean of B, C, D:  
\(\bar x_1 = \frac{-1+1-3}{3} = -1\), \(\bar x_2 = \frac{1-2-2}{3} = -1\) → **(−1, −1)**.

### Second assignment (same centroids)

Distances to **(5, 3)** vs **(−1, −1)** leave **A** in cluster 1 and **B, C, D** in cluster 2 — **no moves** ⇒ convergence.

### Final partition

| Item | Cluster |
|:-----|:-------:|
| A | 1 |
| B | 2 |
| C | 2 |
| D | 2 |

Final centroids: **(5, 3)** and **(−1, −1)**.

![Scatter: cluster 1 = A at (5,3); cluster 2 = B, C, D with centroid (-1,-1)]({{ '/assets/images/graphs/dana4840-kmeans-ws2.svg' | relative_url }})

The figure shows **both centroids**: a **red star** marks centroid **1** at **(5, 3)** (same location as **A**); a **triangle** marks centroid **2** at **(−1, −1)**.

### R code — reproduce the plot (base graphics)

Use **`xlim`** / **`ylim`** wide enough so **A (5, 3)** stays inside the panel. **`asp = 1`** keeps Euclidean distances visually faithful.

{% capture d4840_km_plot_code %}
```r
x1 <- c(5, -1, 1, -3)
x2 <- c(3, 1, -2, -2)
labs <- c("A", "B", "C", "D")

plot(
  x1, x2,
  type = "n",
  xlim = c(-4, 6),
  ylim = c(-3, 4),
  asp  = 1,
  xlab = "x1",
  ylab = "x2",
  main = "Worksheet 2: K-means k=2 (MacQueen)"
)
abline(h = 0, v = 0, col = "gray90", lty = 3)

## Centroidos finales: estrella = C1, triángulo = C2 (pch 8 y 17)
points(5, 3, pch = 8, col = "darkred", cex = 2.2, lwd = 2)
points(-1, -1, pch = 17, col = "darkblue", cex = 2, lwd = 2)

## Ítems: A cluster 1 (rojo), B C D cluster 2 (azul)
points(x1[1], x2[1], pch = 16, col = "firebrick", cex = 1.6)
points(x1[-1], x2[-1], pch = 16, col = "steelblue", cex = 1.6)

text(x1, x2, labels = labs, pos = 3, offset = 0.45, font = 2)

legend(
  "bottomleft",
  legend = c(
    "Centroid 1 (5, 3)",
    "Centroid 2 (-1, -1)",
    "Items cluster 1",
    "Items cluster 2"
  ),
  pch = c(8, 17, 16, 16),
  pt.cex = c(1.8, 1.5, 1.2, 1.2),
  col = c("darkred", "darkblue", "firebrick", "steelblue"),
  bty = "n",
  cex = 0.85
)
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code (figure)" body=d4840_km_plot_code %}
</div>

---

## R: `centers` as a matrix + MacQueen

{% capture d4840_km_code %}
```r
## Tabla del enunciado
df <- data.frame(
  item = c("A", "B", "C", "D"),
  x1   = c(5, -1, 1, -3),
  x2   = c(3, 1, -2, -2),
  stringsAsFactors = FALSE
)

## Solo columnas numéricas; los nombres de fila etiquetan los ítems
X <- as.matrix(df[, c("x1", "x2")])
rownames(X) <- df$item

## Matriz 2×2: fila 1 = centro inicial A, fila 2 = centro inicial C
## (no usar centers = 2 aquí: eso pediría puntos iniciales aleatorios)
initial_centers <- X[c("A", "C"), , drop = FALSE]

km <- kmeans(
  x         = X,
  centers   = initial_centers,
  algorithm = "MacQueen"
)

km$cluster   # etiquetas 1 o 2 por fila de X
km$centers   # centroides finales (una fila por cluster)
km$withinss  # WSS dentro de cada cluster
km$tot.withinss
```
{% endcapture %}

{% capture d4840_km_out %}
```text
A B C D 
1 2 2 2 
     x1 x2
1  5  3
2 -1 -1
[1]  0 14
[1] 14
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_km_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_km_out %}
</div>

**Reading the output:** `cluster` uses integers **1** and **2** only as labels; **`centers`** rows need not follow item order A–D. **`withinss[c]`** is \(\sum_{i \in \text{cluster } c} d^2(\mathbf{x}_i, \bar{\mathbf{x}}_c)\) with **squared** Euclidean distance inside **`kmeans`**.

---

## Total within-cluster sum of squares (part after (a))

<div class="math-block" markdown="0">
\[
\mathrm{WSS} = \sum_{c=1}^{k} \sum_{i \in \text{cluster } c} \|\mathbf{x}_i - \bar{\mathbf{x}}_c\|^2
\]
</div>

Cluster **1** (only **A** at its centroid): contribution **0**.  
Cluster **2**, centroid **(−1, −1)**:

| Item | Squared distance to (−1,−1) |
|:-----|-----------------------------:|
| B (−1, 1) | \((0)^2 + (2)^2 = 4\) |
| C (1, −2) | \((2)^2 + (-1)^2 = 5\) |
| D (−3, −2) | \((-2)^2 + (-1)^2 = 5\) |

**WSS₂ = 4 + 5 + 5 = 14**, total **WSS = 0 + 14 = 14**, matching **`km$tot.withinss`**.

---

## See also

- **Distance measures** — Euclidean setup before clustering.
- **Clustering tendency** — sanity checks before forcing *k* partitions.

---
title: "DANA 4840 — Assessing clustering tendency (iris vs random uniform)"
search: false
categories:
  - Statistics
date: 2026-05-11
last_modified_at: 2026-05-11T12:00:00-06:00
share: linkedin
math: false
---

Fourth study post for **DANA 4840**, aligned with the notebook topic **`assessing_clustering_tendency.Rmd`** (not the `.Rmd` itself — this page is the **blog explanation**). Same idea as the textbook / `factoextra` workflow: **check whether data look clusterable before trusting any clustering algorithm**.

## Why assess clustering tendency?

*k*-means and hierarchical methods **always produce a partition** (or a tree). On **noise** or **uniform random** data they still draw ellipses or cut dendrogram branches — so “I got clusters” is not evidence that structure exists. **Clustering tendency** asks whether separation is **visible / statistically suggestive** before you interpret group labels.

## Setup in this worksheet

- **`iris`** measurements (without species), **standardized** with `scale()`.
- **Random control:** for each column, sample **`runif()`** between that column’s min and max (same *n* as iris), then **standardize** the synthetic matrix too.
- Compare **real iris** vs **random uniform-on-margins** side by side.

## Visual checks

1. **PCA** (`prcomp` + `factoextra::fviz_pca_ind`): iris often shows **three separated clouds** when coloured by species; the random matrix looks like a **single blob** without meaningful gaps.
2. **Forced *k*-means** (`kmeans`, `fviz_cluster`): iris partitions line up roughly with species; on random data the algorithm still paints clusters **without** a convincing spatial story.
3. **Dissimilarity heatmaps** (`fviz_dist`): iris distance matrices often show **block-like patterns**; random standardized draws tend toward a **more homogeneous** texture without strong modular structure.

## Hopkins statistic (rule of thumb)

`factoextra::get_clust_tendency(..., graph = FALSE)` returns **H**. Common interpretation in teaching materials:

- **H clearly above 0.5** → data are **more spatially clustered** than a uniform reference (iris example).
- **H near / below 0.5** → **little evidence** of strong clustering tendency compared to uniform noise (random matrix example).

Exact numbers depend on seed and `n`; run the `.Rmd` locally for your machine’s floating-point output.

---

## Teacher suggestion / última sesión — flujo corto y salida

En pantalla el profesor suele mostrar **menos líneas** que un notebook completo: mismos pasos (escalar → Hopkins → una PCA → una matriz de distancias), menos comentarios. **Código más largo no es incorrecto**: sirve para documentar y repetir el experimento.

The **source R Markdown** for code + figures lives next to your blog tree: `personalblog/assessing_clustering_tendency.Rmd`.

{% capture d4840_act_teacher_hopkins_code %}
```r
library(factoextra)

df_iris <- scale(iris[, -5])
set.seed(123)
rnd <- as.data.frame(
  apply(iris[, -5], 2, function(x) runif(length(x), min(x), max(x)))
)
rnd <- scale(rnd)

set.seed(123)
h_iris <- get_clust_tendency(df_iris, n = nrow(df_iris) - 1, graph = FALSE)$hopkins_stat
h_rand <- get_clust_tendency(rnd, n = nrow(rnd) - 1, graph = FALSE)$hopkins_stat
c(iris = h_iris, random = h_rand)
```
{% endcapture %}

{% capture d4840_act_teacher_hopkins_out %}
```text
    iris   random 
0.8184689 0.4637478 
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code (teacher-style)" body=d4840_act_teacher_hopkins_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_act_teacher_hopkins_out %}
</div>

**Takeaway:** iris scores **high H** (well above 0.5 with `set.seed(123)` in this workflow); the matched random matrix scores **lower**, near the “not strongly clusterable” side — matching the **PCA / distance-map story** in the full `.Rmd`.

## References

- Alboukadel Kassambara — *Practical Guide to Cluster Analysis in R* (clustering tendency chapter).
- [`factoextra`](https://cran.r-project.org/package=factoextra) — `fviz_pca_ind`, `fviz_cluster`, `fviz_dist`, `get_clust_tendency`.

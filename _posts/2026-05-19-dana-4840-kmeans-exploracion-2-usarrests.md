---
title: "DANA 4840 — K-means (exploración 2): USArrests, escala, codo y salida de R"
search: false
categories:
  - Statistics
date: 2026-05-19
last_modified_at: 2026-05-19T12:00:00-06:00
share: linkedin
math: true
---

Notas de exploración sobre **K-means** con datos reales (**`USArrests`**): qué hace la función, por qué **`scale()`**, cómo leer **tamaños**, **centroides**, **WSS**, **`betweenss/totss`** y por qué **`aggregate()`** devuelve medias en **unidades originales**. Para el ejercicio manual con cuatro puntos A–C–D y centros fijos, conviene el post anterior sobre **MacQueen** y **`centers`** como matriz.

---

## 1. Qué es K-means

**K-means** agrupa observaciones en **K** clusters minimizando (de forma aproximada y iterativa) la variabilidad **dentro** de cada grupo: cada punto se asigna al **centroide** más cercano y los centroides se **actualizan** como media de los miembros del grupo.

Ejemplo típico en R:

```r
kmeans(x, centers = 4, nstart = 25)
```

| Parte | Significado |
|:------|:------------|
| **`x`** | Matriz o `data.frame` **solo numérico** (aquí suele ir **`scale(USArrests)`**). |
| **`centers = 4`** | **K = 4**: cuatro grupos. También puede ser una **matriz** de centros iniciales (como en el worksheet con A y C). |
| **`nstart = 25`** | Se prueban **25** conjuntos de centros iniciales aleatorios y se guarda la solución con **menor** `tot.withinss`. Reduce la mala suerte de una sola inicialización. |

Sin **`set.seed()`**, los resultados numéricos pueden cambiar entre ejecuciones aunque **`nstart`** sea alto.

---

## 2. Qué datos son **`USArrests`**

Dataset incluido en R: **50 estados** (filas) y cuatro variables numéricas:

| Variable | Interpretación |
|:---------|:----------------|
| **Murder** | Tasa de homicidios |
| **Assault** | Tasa de asaltos |
| **UrbanPop** | Porcentaje de población urbana |
| **Rape** | Tasa de violación |

La pregunta de clustering es descriptiva: **¿qué estados quedan juntos si medimos “similitud” por perfil de crimen y urbanización?** No implica causalidad ni etiquetas “buenas” o “malas” fuera del contexto del análisis.

---

## 3. Por qué **`scale()`**

Las magnitudes difieren mucho (por ejemplo **Assault** suele ser grande en crudo frente a **Murder**). Sin escalar, la variable con mayor varianza **domina** las distancias euclídeas.

```r
df <- scale(USArrests)
```

**`scale()`** centra cada columna (media 0) y la divide por su desviación típica (desvío 1) usando los datos presentes. Así **cada variable pesa de forma comparable** al calcular distancias en K-means.

---

## 4. Cómo funciona K-means por dentro (idea)

| Paso | Acción |
|:---:|:------|
| 1 | Elegir **K** centroides iniciales. |
| 2 | Asignar cada punto al centroide **más cercano** (euclídeo en el espacio de **`x`**). |
| 3 | Recalcular cada centroide como **media** de los puntos del cluster. |
| 4 | Repetir 2–3 hasta que las asignaciones (o los centroides) **se estabilicen**. |

---

## 5. Método del codo (**elbow**) y elección de **K**

En un gráfico habitual, el eje horizontal es **k** (número de clusters) y el vertical es **total within-cluster sum of squares** (**`tot.withinss`**) u otra medida de error dentro del grupo.

- Cuando **k** crece, **`tot.withinss`** suele **bajar** (más clusters ⇒ puntos más cerca de “su” centro).
- Se busca un **“codo”**: una **k** donde bajar **k** más aporta **poco** extra frente al coste de interpretar más grupos.

Muchos materiales de curso usan **k = 4** con **`USArrests`** como ilustración cuando el codo sugiere cuatro grupos; la **k óptima** no es única: depende del criterio y del contexto.

---

## 6. Salida típica: tamaños de cluster

Tras **`kmeans(df, 4, nstart = 25)`** puede aparecer algo como:

```text
K-means clustering with 4 clusters of sizes 8, 13, 16, 13
```

| Cluster | Estados (con esa solución) |
|:-------:|:--------------------------:|
| 1 | 8 |
| 2 | 13 |
| 3 | 16 |
| 4 | 13 |

**8 + 13 + 16 + 13 = 50**. Los números exactos dependen de la solución elegida entre los **`nstart`** intentos.

---

## 7. **`Cluster means`** (sobre datos escalados)

La tabla **`km$centers`** da el **centroide** de cada cluster en las **mismas unidades que `x`**. Si **`x = scale(USArrests)`**:

| Valor | Lectura |
|:------|:--------|
| **Positivo** | Por encima de la media global de esa variable (en el conjunto escalado). |
| **Negativo** | Por debajo de la media global. |
| **Cerca de 0** | Cerca del “promedio típico” del dataset. |

Ejemplo de lectura: un cluster con **Murder**, **Assault** y **Rape** altos en positivo sugiere perfil de **crimen relativamente alto** respecto al resto de estados; otro con esos valores negativos sugiere **crimen relativamente bajo**.

---

## 8. Vector **`cluster`**

Asigna a cada fila un entero **1 … K**:

```text
Alabama 1
Alaska 4
...
```

Significa: Alabama va al cluster **1**, Alaska al **4**, etc. Es la partición **final** de esa llamada a **`kmeans`**.

---

## 9. **`withinss`** y **`tot.withinss`**

```text
Within cluster sum of squares by cluster:
[1]  ...  ...  ...  ...
```

Cada componente mide la **dispersión dentro** de un cluster respecto a **su** centroide (K-means usa **distancia euclídea al cuadrado** en la definición interna de esa suma).

**`km$tot.withinss`** es la **suma** de esos valores: dispersión total **dentro** de los cuatro grupos.

**Importante:** **`tot.withinss`** **no** es el porcentaje **71.2 %**. El porcentaje aparece en la línea **`(between_SS / total_SS = …)`** (siguiente apartado).

---

## 10. **`betweenss`** y **`totss`**

R muestra a menudo:

```text
(between_SS / total_SS =  71.2 %)
```

Interpretación: **qué fracción de la variación total** del conjunto (sobre los datos transformados que entraron en **`kmeans`**) queda **entre** centroides frente a **dentro** de clusters. Un valor **más alto** indica clusters **más separados** en ese sentido (siempre con cautela: **K** alto puede inflar la métrica).

Ejemplo de frase para informe:

**The 4-cluster solution explains about 71.2% of the total variation in the scaled `USArrests` data** (según esa corrida concreta).

Con **`set.seed(123)`**, **`nstart = 25`** y **`centers = 4`**, una corrida reproducible da **`betweenss/totss ≈ 71.2%`** y **`tot.withinss ≈ 56.4`** (no confundir ambos números).

---

## 11. Por qué **`aggregate()`** sobre **`USArrests`** sin escalar

```r
aggregate(USArrests, by = list(cluster = km$cluster), mean)
```

Aquí las medias son por cluster pero en **unidades reales** (tasas y porcentajes), lo que facilita **interpretar** y comparar con tablas públicas.

Ejemplo reproducible (**`set.seed(123)`**):

| cluster | Murder | Assault | UrbanPop | Rape |
|:-------:|-------:|--------:|---------:|-----:|
| 1 | 13.94 | 243.63 | 53.75 | 21.41 |
| 2 | 3.60 | 78.54 | 52.08 | 12.18 |
| 3 | 5.66 | 138.88 | 73.88 | 18.78 |
| 4 | 10.82 | 257.38 | 76.00 | 33.19 |

Lectura rápida ilustrativa:

| Cluster | Perfil (orientativo) |
|:-------:|:---------------------|
| 1 | Criminalidad alta en varias tasas, urbanización moderada |
| 2 | Criminalidad baja |
| 3 | Criminalidad intermedia, urbanización alta |
| 4 | Asaltos y violación altos, urbanización alta |

Los perfiles dependen de la solución K-means obtenida.

---

## 12. Código reproducible (resumen)

{% capture d4840_km2_code %}
```r
set.seed(123)

# Entrada: datos estandarizados (misma escala por variable)
df <- scale(USArrests)

# k = 4, varios intentos de inicio aleatorio
km <- kmeans(df, centers = 4, nstart = 25)

km$size           # tamaños por cluster
km$centers        # centroides en espacio escalado
km$cluster        # etiqueta por estado
km$withinss       # WSS dentro de cada cluster
km$tot.withinss   # suma total de WSS dentro
km$betweenss / km$totss   # fracción explicada entre grupos

# Medias en unidades originales (más legible)
aggregate(USArrests, by = list(cluster = km$cluster), mean)
```
{% endcapture %}

{% capture d4840_km2_out %}
```text
size: 8, 13, 16, 13 
withinss:
[1]  8.316061 11.952463 16.212213 19.922437
tot.withinss: 56.40317 
(between_SS / total_SS =  71.2 %)
  cluster   Murder   Assault UrbanPop     Rape
1       1 13.93750 243.62500 53.75000 21.41250
2       2  3.60000  78.53846 52.07692 12.17692
3       3  5.65625 138.87500 73.87500 18.78125
4       4 10.81538 257.38462 76.00000 33.19231
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_km2_code %}
{% include r_panel.html kind="output" label="Console output (resumen)" body=d4840_km2_out %}
</div>

*(La salida completa incluye el vector de cluster por estado y la tabla de medias escaladas en **`km$centers`**.)*

---

## Qué conviene dominar (exam / worksheet)

| Concepto | Idea clave |
|:---------|:-----------|
| K-means | Partición en **K** grupos por centroides y distancias |
| **K** | Número de clusters |
| **`scale()`** | Comparar variables en **escala similar** |
| **`centers`** | Entero **K** *o* matriz de centros iniciales |
| **`nstart`** | Mejor entre varias inicializaciones aleatorias |
| **Método del codo** | Ayuda a elegir **K** (subjetivo + contexto) |
| **`cluster`** | Grupo asignado a cada observación |
| **`centers`** | Centroide por cluster (en las unidades de **`x`**) |
| **`withinss`** | Dispersión interna por cluster |
| **`tot.withinss`** | Suma de dispersiones internas |
| **`betweenss/totss`** | Separación relativa entre grupos |

**Frase corta:** K-means reparte los datos en **K** grupos asignando cada observación al centro más cercano y **moviendo** los centros hasta que la partición se estabiliza; **`scale()`** evita que una sola variable domine por magnitud.

---

## Ver también

- **K-means MacQueen, worksheet cuatro puntos (A–D)** — centros iniciales como matriz y WSS a mano.

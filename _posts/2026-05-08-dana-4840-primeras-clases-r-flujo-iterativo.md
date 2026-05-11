---
title: "DANA 4840 — R: estructuras básicas (recordatorio) y dataset Worksheet 0a"
search: false
categories:
  - Statistics
date: 2026-05-08
last_modified_at: 2026-05-10T18:00:00-06:00
share: linkedin
---

Study sheet for **DANA 4840**: R objects (`vector`, `list`, `matrix`, `array`, `data.frame`, factors) and **Worksheet 0a** (building the mixed dataset, reading `.txt`, `.xlsx`, and `.csv`, and aligning types with `daisy()` / Gower-style coding).

{% capture d4840_vec_code %}
```r
# =========================
# Vector
# =========================
myvector <- c(1, 3, 5)
myvector
str(myvector)
class(myvector)
is.vector(myvector)
```
{% endcapture %}

{% capture d4840_vec_out %}
```text
[1] 1 3 5

 num [1:3] 1 3 5

[1] "numeric"

[1] TRUE
```
{% endcapture %}

## Vector

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_vec_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_vec_out %}
</div>

{% capture d4840_list_code %}
```r
# =========================
# List
# =========================
a <- c(1:4)
b <- c("John", "Mary")
mylist <- list(a, b)
str(mylist)
class(mylist)
is.vector(mylist)
is.list(mylist)
```
{% endcapture %}

{% capture d4840_list_out %}
```text
List of 2
 $ : int [1:4] 1 2 3 4
 $ : chr [1:2] "John" "Mary"

[1] "list"

[1] TRUE

[1] TRUE
```
{% endcapture %}

## Lista

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_list_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_list_out %}
</div>

{% capture d4840_mat_code %}
```r
# =========================
# Matrix
# =========================
mymatrix <- matrix(c(1:6), 2, 3, byrow = TRUE)
mymatrix
str(mymatrix)
class(mymatrix)
is.matrix(mymatrix)
```
{% endcapture %}

{% capture d4840_mat_out %}
```text
     [,1] [,2] [,3]
[1,]    1    2    3
[2,]    4    5    6

 int [1:2, 1:3] 1 4 2 5 3 6

[1] "matrix" "array"

[1] TRUE
```
{% endcapture %}

## Matriz

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_mat_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_mat_out %}
</div>

{% capture d4840_arr_code %}
```r
# =========================
# Array
# =========================
myarray <- array(c(1:12), dim = c(2, 3, 2))
myarray
str(myarray)
class(myarray)
is.matrix(myarray)
is.array(myarray)
```
{% endcapture %}

{% capture d4840_arr_out %}
```text
, , 1

     [,1] [,2] [,3]
[1,]    1    3    5
[2,]    2    4    6

, , 2

     [,1] [,2] [,3]
[1,]    7    9   11
[2,]    8   10   12

 int [1:2, 1:3, 1:2] 1 2 3 4 5 6 7 8 9 10 ...

[1] "array"

[1] FALSE

[1] TRUE
```
{% endcapture %}

## Array

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_arr_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_arr_out %}
</div>

{% capture d4840_df_code %}
```r
# =========================
# Data frame
# =========================
mydataframe <- data.frame(
  Gender = c("Male", "Female", "Male"),
  Age = c(22, 30, 33),
  medal = c("Gold", "Gold", "Bronze")
)
mydataframe
str(mydataframe)
class(mydataframe)
is.data.frame(mydataframe)
```
{% endcapture %}

{% capture d4840_df_out %}
```text
  Gender Age  medal
1   Male  22   Gold
2 Female  30   Gold
3   Male  33 Bronze

'data.frame':	3 obs. of  3 variables:
 $ Gender: chr  "Male" "Female" "Male"
 $ Age   : num  22 30 33
 $ medal : chr  "Gold" "Gold" "Bronze"

[1] "data.frame"

[1] TRUE
```
{% endcapture %}

## Data frame

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_df_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_df_out %}
</div>

### Sin conversión automática a factor (caracteres como texto)

{% capture d4840_strings_factors_code %}
```r
# =========================
# data.frame — stringsAsFactors = FALSE
# =========================
mydataframe <- data.frame(
  Gender = c("Male", "Female", "Male"),
  Age = c(22, 30, 33),
  medal = c("Gold", "Gold", "Bronze"),
  stringsAsFactors = FALSE
)
mydataframe$medal
is.factor(mydataframe$medal)
is.vector(mydataframe$medal)
```
{% endcapture %}

{% capture d4840_strings_factors_out %}
```text
[1] "Gold"   "Gold"   "Bronze"

[1] FALSE

[1] TRUE
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_strings_factors_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_strings_factors_out %}
</div>

### Factor nominal

`factor()` sin `ordered = TRUE` define niveles **sin orden inherente**: las categorías se tratan como **nominales** (solo identidad, no “mayor/menor”). Sirve para sexo, país, tipo de sangre, etc.

{% capture d4840_fac_nom_code %}
```r
# =========================
# Factor nominal
# =========================
myfactor <- factor(c("M", "F", "T", "O", "M"))
myfactor
str(myfactor)
class(myfactor)
is.factor(myfactor)
```
{% endcapture %}

{% capture d4840_fac_nom_out %}
```text
[1] M F T O M
Levels: F M O T

 Factor w/ 4 levels "F","M","O","T": 2 1 4 3 2

[1] "factor"

[1] TRUE
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_fac_nom_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_fac_nom_out %}
</div>

### Factor ordinal (`ordered`, `levels`)

Con **`ordered = TRUE`** el factor es **ordinal**: los niveles tienen un **orden lógico** fijado con **`levels = c(...)`** (de menor a mayor en ese sentido). R lo guarda como entero con orden; comparaciones como `<` entre niveles respetan esa secuencia (útil para tallas, Likert, etapas).

{% capture d4840_fac_ord_code %}
```r
# =========================
# Factor ordinal
# =========================
myfactor <- factor(
  c("M", "F", "T", "O", "M"),
  ordered = TRUE,
  levels = c("O", "M", "F", "T")
)
myfactor
is.factor(myfactor)
```
{% endcapture %}

{% capture d4840_fac_ord_out %}
```text
[1] M F T O M
Levels: O < M < F < T

[1] TRUE
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_fac_ord_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_fac_ord_out %}
</div>

---

## Worksheet 0a — dataset

Fuente: [McCaffrey — Gower distance example](https://jamesmccaffrey.wordpress.com/2020/04/21/example-of-calculating-the-gower-distance/)

| Age | Race | Height   | Income | IsMale | Politics     |
|-----|------|----------|--------|--------|--------------|
| 22  | 1    | Tall     | 0.39   | TRUE   | moderate     |
| 33  | 3    | Short    | 0.34   | TRUE   | liberal      |
| 52  | 1    | Moderate | 0.51   | FALSE  | moderate     |
| 46  | 6    | Tall     | 0.63   | TRUE   | conservative |

### (a)

**Worksheet 0a — (a)**  
For each variable above, identify if it is a categorical variable or a quantitative one. If it is a categorical variable, further classify the variable as a nominal (or binary) or ordinal.

Cuantitativa vs categórica; nominal, ordinal o binaria.

| Variable   | Tipo              | Detalle |
|------------|-------------------|--------|
| **Age**    | Cuantitativa      | Edad en años (numérica discreta). |
| **Race**   | Categórica **nominal** | Códigos 1, 3, 6… sin orden inherente “mayor/menor”; solo etiquetas distintas. |
| **Height** | Categórica **ordinal** | Niveles *Short*, *Moderate*, *Tall* admiten orden natural por estatura: Short &lt; Moderate &lt; Tall. |
| **Income** | Cuantitativa      | Valores numéricos (aquí parecen proporciones 0–1); se trata como escala numérica, no como etiquetas. |
| **IsMale** | Categórica **binaria** (nominal) | Solo `TRUE` / `FALSE`; dos categorías sin orden (no decimos que un sexo sea “mayor” que otro en sentido estadístico). |
| **Politics** | Categórica **nominal** (típico en análisis) | *liberal*, *moderate*, *conservative* son etiquetas; el espectro izquierda–derecha podría argumentarse como orden, pero el orden exacto y la distancia entre etiquetas no están fijados en el dato, así que en el worksheet suele tratarse como **nominal** salvo que el curso imponga un orden explícito. |

**Resumen:** tus “numerical” → **Age**, **Income** (cuantitativas). El resto son **categóricas**; entre ellas, **Height** es la que encaja mejor como **ordinal** por el orden físico de las categorías. **Race**, **IsMale** y **Politics** (como nominal) no llevan orden obligatorio en la definición del dataset.

Archivos de ejemplo en el repo (mismas filas que la tabla): [`dana4840_worksheet0a.txt`]({{ site.baseurl }}/assets/data/dana4840_worksheet0a.txt) (tabuladores) y [`dana4840_worksheet0a.csv`]({{ site.baseurl }}/assets/data/dana4840_worksheet0a.csv). En **(d)** el `.xlsx` se puede **generar en R** con `writexl` (ruta `assets/data/dana4840_worksheet0a.xlsx`) o crear a mano / exportar desde Excel en esa carpeta.

### (b)

**Worksheet 0a — (b)**  
Use R to create each variable, making sure the type matches your answer in (a). Then create a data frame in R to collectively house these variables as a data set.

Tipos alineados con (a): enteros/reales; `factor` nominal (Race, Politics); `ordered` (Height); `logical` (IsMale).

{% capture d4840_ws0a_b_code %}
```r
# =========================
# Worksheet 0a — Part (b)
# =========================
Age <- c(22L, 33L, 52L, 46L)
Race <- factor(c(1, 3, 1, 6))
Height <- factor(
  c("Tall", "Short", "Moderate", "Tall"),
  levels = c("Short", "Moderate", "Tall"),
  ordered = TRUE
)
Income <- c(0.39, 0.34, 0.51, 0.63)
IsMale <- c(TRUE, TRUE, FALSE, TRUE)
Politics <- factor(c("moderate", "liberal", "moderate", "conservative"))

ws0a <- data.frame(Age, Race, Height, Income, IsMale, Politics)
str(ws0a)
```
{% endcapture %}

{% capture d4840_ws0a_b_out %}
```text
'data.frame':	4 obs. of  6 variables:
 $ Age     : int  22 33 52 46
 $ Race    : Factor w/ 3 levels "1","3","6": 1 2 1 3
 $ Height  : Ord.factor w/ 3 levels "Short"<"Moderate"<"Tall": 3 1 2 3
 $ Income  : num  0.39 0.34 0.51 0.63
 $ IsMale  : logi  TRUE TRUE FALSE TRUE
 $ Politics: Factor w/ 3 levels "conservative","liberal",..: 3 2 3 1
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_ws0a_b_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_ws0a_b_out %}
</div>

### (c)

**Worksheet 0a — (c)**  
Type the data into a text file. Use read.table() to read the contents of the text file. Is the output of read.table() a data frame or some other data structure? Do the variables match the type in part (a)? If not, how do you convert them?

Por defecto devuelve un data.frame. Aquí el TXT se **genera en R** con `writeLines()` y se lee con `read.table()`. Tras leer, los tipos suelen no coincidir del todo con (a) hasta convertir Race, Height, IsMale y Politics.

{% capture d4840_ws0a_c_code %}
```r
# =========================
# Worksheet 0a — Part (c)
# =========================

# =========================
# Create local TXT file
# =========================

lines <- c(
  "Age\tRace\tHeight\tIncome\tIsMale\tPolitics",
  "22\t1\tTall\t0.39\tTRUE\tmoderate",
  "33\t3\tShort\t0.34\tTRUE\tliberal",
  "52\t1\tModerate\t0.51\tFALSE\tmoderate",
  "46\t6\tTall\t0.63\tTRUE\tconservative"
)

writeLines(lines, "dana4840_worksheet0a.txt")

file.exists("dana4840_worksheet0a.txt")

getwd()

# =========================
# Read TXT
# =========================

fp <- "dana4840_worksheet0a.txt"

df_txt <- read.table(
  fp,
  header = TRUE,
  sep = "\t",
  stringsAsFactors = FALSE
)

class(df_txt)

str(df_txt)

# =========================
# Convert variables
# =========================

# Nominal categorical
df_txt$Race <- factor(df_txt$Race)

# Ordinal categorical
df_txt$Height <- factor(
  df_txt$Height,
  levels = c("Short", "Moderate", "Tall"),
  ordered = TRUE
)

# Binary categorical
df_txt$IsMale <- factor(
  df_txt$IsMale,
  levels = c(FALSE, TRUE),
  labels = c("Female", "Male")
)

# Politics as nominal factor
df_txt$Politics <- factor(df_txt$Politics)

# =========================
# Final structure
# =========================

str(df_txt)

df_txt
```
{% endcapture %}

{% capture d4840_ws0a_c_out %}
```text
[1] TRUE
[1] "P:/langara/term 4/dana 4840"
[1] "data.frame"
'data.frame':	4 obs. of  6 variables:
 $ Age     : int  22 33 52 46
 $ Race    : int  1 3 1 6
 $ Height  : chr  "Tall" "Short" "Moderate" "Tall"
 $ Income  : num  0.39 0.34 0.51 0.63
 $ IsMale  : logi  TRUE TRUE FALSE TRUE
 $ Politics: chr  "moderate" "liberal" "moderate" "conservative"
'data.frame':	4 obs. of  6 variables:
 $ Age     : int  22 33 52 46
 $ Race    : Factor w/ 3 levels "1","3","6": 1 2 1 3
 $ Height  : Ord.factor w/ 3 levels "Short"<"Moderate"<..: 3 1 2 3
 $ Income  : num  0.39 0.34 0.51 0.63
 $ IsMale  : Factor w/ 2 levels "Female","Male": 2 2 1 2
 $ Politics: Factor w/ 3 levels "conservative",..: 3 2 3 1
   Age Race   Height Income IsMale   Politics
1   22    1     Tall   0.39   Male   moderate
2   33    3    Short   0.34   Male    liberal
3   52    1 Moderate   0.51 Female   moderate
4   46    6     Tall   0.63   Male conservative
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_ws0a_c_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_ws0a_c_out %}
</div>

### (d)

**Worksheet 0a — (d)**  
Type the data into an Excel file. Use read_excel() in package “readxl” to read the contents of the Excel file. Is the output a data frame or some other data structure? If it is not a data frame, how do you convert it into a data frame? Do the variables match the type in part (a)?

read_excel() devuelve un tibble (tbl_df), subclase de data.frame. Usa as.data.frame() si hace falta. Aplica las mismas conversiones que en (c) para alinear con (a). El **`.xlsx` se escribe en R** con **`writexl`** (`readxl` solo lee); `fp <- "assets/data/dana4840_worksheet0a.xlsx"` alinea con el blog/repo. Instalación: `install.packages(c("writexl", "readxl"))`.

{% capture d4840_ws0a_d_code %}
```r
# =========================
# Worksheet 0a — Part (d)
# =========================
# Crea assets/data/dana4840_worksheet0a.xlsx, luego read_excel(fp).

# =========================
# Create Excel file (writexl)
# =========================
library(writexl)

fp <- "assets/data/dana4840_worksheet0a.xlsx"
dir.create("assets/data", recursive = TRUE, showWarnings = FALSE)

ws0a_xl <- data.frame(
  Age = c(22L, 33L, 52L, 46L),
  Race = c(1, 3, 1, 6),
  Height = c("Tall", "Short", "Moderate", "Tall"),
  Income = c(0.39, 0.34, 0.51, 0.63),
  IsMale = c(TRUE, TRUE, FALSE, TRUE),
  Politics = c("moderate", "liberal", "moderate", "conservative"),
  stringsAsFactors = FALSE
)

write_xlsx(ws0a_xl, path = fp)

file.exists(fp)

# =========================
# Read Excel (readxl)
# =========================
library(readxl)

df_xl <- read_excel(fp)

class(df_xl)

df_xl <- as.data.frame(df_xl)

str(df_xl, vec.len = 1)

# =========================
# Convert variables (same as part (c) / align with (a))
# =========================
df_xl$Race <- factor(df_xl$Race)

df_xl$Height <- factor(
  df_xl$Height,
  levels = c("Short", "Moderate", "Tall"),
  ordered = TRUE
)

df_xl$IsMale <- factor(
  df_xl$IsMale,
  levels = c(FALSE, TRUE),
  labels = c("Female", "Male")
)

df_xl$Politics <- factor(df_xl$Politics)

str(df_xl)

df_xl
```
{% endcapture %}

{% capture d4840_ws0a_d_out %}
```text
[1] TRUE
[1] "tbl_df"     "tbl"        "data.frame"

'data.frame':	4 obs. of  6 variables:

 $ Age     : num 22 ...

 $ Race    : num 1 ...

 $ Height  : chr "Tall" ...

 $ Income  : num 0.39 ...

 $ IsMale  : logi TRUE ...

 $ Politics: chr "moderate" ...
'data.frame':	4 obs. of  6 variables:
 $ Age     : int  22 33 52 46
 $ Race    : Factor w/ 3 levels "1","3","6": 1 2 1 3
 $ Height  : Ord.factor w/ 3 levels "Short"<"Moderate"<..: 3 1 2 3
 $ Income  : num  0.39 0.34 0.51 0.63
 $ IsMale  : Factor w/ 2 levels "Female","Male": 2 2 1 2
 $ Politics: Factor w/ 3 levels "conservative",..: 3 2 3 1
   Age Race   Height Income IsMale   Politics
1   22    1     Tall   0.39   Male   moderate
2   33    3    Short   0.34   Male    liberal
3   52    1 Moderate   0.51 Female   moderate
4   46    6     Tall   0.63   Male conservative
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_ws0a_d_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_ws0a_d_out %}
</div>

### (e)

**Worksheet 0a — (e)**  
Create a CSV file using the data. Use read.csv() to read the contents of the CSV file. Is the output a data frame or some other data structure? Do the variables match the type in part (a)?

read.csv() devuelve un data.frame. Aquí el CSV se **genera en R** con `write.csv()` (mismas filas que la tabla), luego se lee; con `stringsAsFactors = FALSE` los tipos suelen no coincidir con (a) hasta aplicar las mismas conversiones que en (c).

{% capture d4840_ws0a_e_code %}
```r
# =========================
# Worksheet 0a — Part (e)
# =========================

# =========================
# Create local CSV file
# =========================
ws0a_raw <- data.frame(
  Age = c(22L, 33L, 52L, 46L),
  Race = c(1, 3, 1, 6),
  Height = c("Tall", "Short", "Moderate", "Tall"),
  Income = c(0.39, 0.34, 0.51, 0.63),
  IsMale = c(TRUE, TRUE, FALSE, TRUE),
  Politics = c("moderate", "liberal", "moderate", "conservative"),
  stringsAsFactors = FALSE
)

write.csv(ws0a_raw, "dana4840_worksheet0a.csv", row.names = FALSE)

file.exists("dana4840_worksheet0a.csv")

# =========================
# Read CSV
# =========================
fp <- "dana4840_worksheet0a.csv"

df_csv <- read.csv(fp, stringsAsFactors = FALSE)

class(df_csv)

str(df_csv)

# =========================
# Convert variables (same idea as part c)
# =========================
df_csv$Race <- factor(df_csv$Race)

df_csv$Height <- factor(
  df_csv$Height,
  levels = c("Short", "Moderate", "Tall"),
  ordered = TRUE
)

df_csv$IsMale <- factor(
  df_csv$IsMale,
  levels = c(FALSE, TRUE),
  labels = c("Female", "Male")
)

df_csv$Politics <- factor(df_csv$Politics)

str(df_csv)

df_csv
```
{% endcapture %}

{% capture d4840_ws0a_e_out %}
```text
[1] TRUE
[1] "data.frame"
'data.frame':	4 obs. of  6 variables:
 $ Age     : int  22 33 52 46
 $ Race    : int  1 3 1 6
 $ Height  : chr  "Tall" "Short" "Moderate" "Tall"
 $ Income  : num  0.39 0.34 0.51 0.63
 $ IsMale  : logi  TRUE TRUE FALSE TRUE
 $ Politics: chr  "moderate" "liberal" "moderate" "conservative"
'data.frame':	4 obs. of  6 variables:
 $ Age     : int  22 33 52 46
 $ Race    : Factor w/ 3 levels "1","3","6": 1 2 1 3
 $ Height  : Ord.factor w/ 3 levels "Short"<"Moderate"<..: 3 1 2 3
 $ Income  : num  0.39 0.34 0.51 0.63
 $ IsMale  : Factor w/ 2 levels "Female","Male": 2 2 1 2
 $ Politics: Factor w/ 3 levels "conservative",..: 3 2 3 1
   Age Race   Height Income IsMale   Politics
1   22    1     Tall   0.39   Male   moderate
2   33    3    Short   0.34   Male    liberal
3   52    1 Moderate   0.51 Female   moderate
4   46    6     Tall   0.63   Male conservative
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code" body=d4840_ws0a_e_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_ws0a_e_out %}
</div>

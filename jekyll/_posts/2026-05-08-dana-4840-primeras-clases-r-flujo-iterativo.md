---
title: "DANA 4840 — R: basic structures (refresher) and Worksheet 0a dataset"
search: false
categories:
  - Statistics
date: 2026-05-08
last_modified_at: 2026-05-11T12:00:00-06:00
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

## List

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

## Matrix

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

### No automatic conversion to factor (characters stay as text)

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

### Nominal factor

With `factor()` and **without** `ordered = TRUE`, levels have **no inherent order**: categories are **nominal** (identity only, not “greater/lesser”). Use this for sex, country, blood type, etc.

{% capture d4840_fac_nom_code %}
```r
# =========================
# Nominal factor
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

### Ordinal factor (`ordered`, `levels`)

With **`ordered = TRUE`**, the factor is **ordinal**: levels follow a **logical order** set by **`levels = c(...)`** (low to high in that sense). R stores them as ordered integers; comparisons like `<` between levels follow that sequence (useful for sizes, Likert scales, stages).

{% capture d4840_fac_ord_code %}
```r
# =========================
# Ordinal factor
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

## Worksheet 0a — example dataset

Source: [McCaffrey — Gower distance example](https://jamesmccaffrey.wordpress.com/2020/04/21/example-of-calculating-the-gower-distance/)

| Age | Race | Height   | Income | IsMale | Politics     |
|-----|------|----------|--------|--------|--------------|
| 22  | 1    | Tall     | 0.39   | TRUE   | moderate     |
| 33  | 3    | Short    | 0.34   | TRUE   | liberal      |
| 52  | 1    | Moderate | 0.51   | FALSE  | moderate     |
| 46  | 6    | Tall     | 0.63   | TRUE   | conservative |

### (a)

**Worksheet 0a — (a)**  
For each variable above, identify if it is a categorical variable or a quantitative one. If it is a categorical variable, further classify the variable as a nominal (or binary) or ordinal.

Quantitative vs categorical; nominal, ordinal, or binary.

| Variable   | Type | Notes |
|------------|------|--------|
| **Age**    | Quantitative | Age in years (discrete numeric). |
| **Race**   | **Nominal** categorical | Codes 1, 3, 6, … with no inherent “greater/lesser” order; distinct labels only. |
| **Height** | **Ordinal** categorical | Levels *Short*, *Moderate*, *Tall* have a natural stature order: Short &lt; Moderate &lt; Tall. |
| **Income** | Quantitative | Numeric values (here they look like proportions on 0–1); treat as a numeric scale, not as labels. |
| **IsMale** | **Binary** categorical (nominal) | Only `TRUE` / `FALSE`; two categories with no order (we do not rank sexes in a statistical sense). |
| **Politics** | **Nominal** categorical (typical in analyses) | *liberal*, *moderate*, *conservative* are labels; a left–right spectrum could be argued as ordered, but the exact order and spacing between labels are not fixed in the data, so the worksheet usually treats this as **nominal** unless the course specifies an explicit order. |

**Summary:** your “numerical” variables are **Age** and **Income** (quantitative). The rest are **categorical**; among those, **Height** fits best as **ordinal** because of the physical ordering of categories. **Race**, **IsMale**, and **Politics** (as nominal) do not require an order in how this dataset is defined.

Sample files in the repo (same rows as the table): [`dana4840_worksheet0a.txt`]({{ site.baseurl }}/assets/data/dana4840_worksheet0a.txt) (tab-separated) and [`dana4840_worksheet0a.csv`]({{ site.baseurl }}/assets/data/dana4840_worksheet0a.csv). For **(d)**, you can **generate** the `.xlsx` in R with `writexl` at `assets/data/dana4840_worksheet0a.xlsx`, or create / export from Excel into that folder.

### (b)

**Worksheet 0a — (b)**  
Use R to create each variable, making sure the type matches your answer in (a). Then create a data frame in R to collectively house these variables as a data set.

Types aligned with (a): integer/double; nominal `factor` (Race, Politics); `ordered` (Height); `logical` (IsMale).

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

By default this returns a `data.frame`. Here the TXT file is **created in R** with `writeLines()` and read with `read.table()`. After reading, types usually do not fully match (a) until you convert Race, Height, IsMale, and Politics.

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

`read_excel()` returns a tibble (`tbl_df`), a subclass of `data.frame`. Use `as.data.frame()` if you need a plain data frame. Apply the same conversions as in (c) to align with (a). The **`.xlsx` is written in R** with **`writexl`** (`readxl` only reads); `fp <- "assets/data/dana4840_worksheet0a.xlsx"` matches the blog/repo layout. Install with: `install.packages(c("writexl", "readxl"))`.

{% capture d4840_ws0a_d_code %}
```r
# =========================
# Worksheet 0a — Part (d)
# =========================
# Creates assets/data/dana4840_worksheet0a.xlsx, then read_excel(fp).

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

`read.csv()` returns a `data.frame`. Here the CSV is **created in R** with `write.csv()` (same rows as the table), then read back; with `stringsAsFactors = FALSE` types usually do not match (a) until you apply the same conversions as in (c).

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

---

## Teacher suggestion / última sesión — Worksheet 0a en pocas líneas

En clase a veces solo se muestra **leer el `.txt` ya existente** y revisar `class()` / `str()` / `head()`, sin recrear el archivo ni todas las conversiones a factor en el mismo bloque. Tu versión larga arriba sigue siendo la referencia para **reproducir** todo el flujo.

Run **part (c)** first so `dana4840_worksheet0a.txt` exists (or create that file by hand).

{% capture d4840_teacher_ws0a_code %}
```r
fp_txt <- "dana4840_worksheet0a.txt"
stopifnot(file.exists(fp_txt))
df0 <- read.table(fp_txt, header = TRUE, sep = "\t", stringsAsFactors = FALSE)
class(df0)
str(df0)
head(df0)
```
{% endcapture %}

{% capture d4840_teacher_ws0a_out %}
```text
[1] "data.frame"
'data.frame':	4 obs. of  6 variables:
 $ Age     : int  22 33 52 46
 $ Race    : int  1 3 1 6
 $ Height  : chr  "Tall" "Short" "Moderate" "Tall"
 $ Income  : num  0.39 0.34 0.51 0.63
 $ IsMale  : logi  TRUE TRUE FALSE TRUE
 $ Politics: chr  "moderate" "liberal" "moderate" "conservative"
  Age Race   Height Income IsMale   Politics
1  22    1     Tall   0.39   TRUE   moderate
2  33    3    Short   0.34   TRUE    liberal
3  52    1 Moderate   0.51  FALSE   moderate
4  46    6     Tall   0.63   TRUE conservative
```
{% endcapture %}

<div class="r-stack">
{% include r_panel.html kind="code" label="R code (teacher-style)" body=d4840_teacher_ws0a_code %}
{% include r_panel.html kind="output" label="Console output" body=d4840_teacher_ws0a_out %}
</div>

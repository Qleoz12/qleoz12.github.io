---
title: "Fundamentals, data analitics linear regression and bias"
search: false
categories: 
  - Statistics
date: 2025-10-08
last_modified_at: 2025-10-08T08:06:00-06:00
share: linkedin
---


🧩 What Is X and What Is X_b?
🔹 X

X is your feature matrix — it contains the input values you want the model to learn from.

Example:
If you have one feature (say, number of pages in a book), X looks like this:

X = [[100],
     [200],
     [300],
     [400]]


It’s a column of data — every row is one training example.

💡 Shape: (m, n)

m = number of training examples (rows)

n = number of features (columns)

So in this case, m = 4, n = 1.

🔹 X_b

Before using the Normal Equation, we must add a column of 1s to X.

Why?
Because our formula for linear regression is:

𝑦
=
𝜃
0
+
𝜃
1
𝑥
y=θ
0
	​

+θ
1
	​

x

That θ₀ (the intercept or bias term) multiplies by 1 every time.
To make it fit the same matrix format, we add a column of 1s to X.

X_b = [[1, 100],
       [1, 200],
       [1, 300],
       [1, 400]]


Now the first column (all 1s) corresponds to θ₀, and the second column corresponds to θ₁.

💡 Shape of X_b: (m, n+1)

🧠 What Is the Bias Term (θ₀ or intercept_)?

The bias term (also called intercept) is the value of y when all features are 0.
It basically shifts the regression line up or down so it fits the data better.

Example:

If your model is

𝑦
=
4
+
3
𝑥
y=4+3x

then:

θ₀ (bias) = 4 → this means when x = 0, y starts at 4

θ₁ (weight) = 3 → this means for every 1 increase in x, y goes up by 3

So, in your Scikit-Learn output:

lin_reg.intercept_, lin_reg.coef_


you got:

(array([4.21509616]), array([[2.77011339]]))


That means:

Bias/intercept = 4.215

Slope/weight = 2.770

So your final model is:

𝑦
^
=
4.215
+
2.770
𝑥
y
^
	​

=4.215+2.770x
🔁 And What Does the “T” Mean in X.T?

X.T means the transpose of X.

Transpose means switch rows and columns.

If X looks like this:

1   2   3
4   5   6


Then X.T looks like this:

1   4
2   5
3   6


This is used because in matrix algebra, to multiply correctly, dimensions must align.
So the Normal Equation uses X.T to flip the matrix for proper multiplication:

𝜃
=
(
𝑋
𝑇
𝑋
)
−
1
𝑋
𝑇
𝑦
θ=(X
T
X)
−1
X
T
y
🧮 Putting It All Together
Symbol	Meaning	Example
X	Feature matrix	Pages in each book
X_b	Feature matrix with column of 1s	Adds bias term
y	Target values	Prices of books
θ₀	Intercept (bias)	Where the line crosses y-axis
θ₁...θₙ	Weights/slopes	How much each feature affects y
X.T	Transpose of X	Flips rows ↔ columns for math compatibility
🧠 Intuitive Summary

👉 The bias term lets your line start at the right height.
👉 The weights control how steep the line is.
👉 The Normal Equation finds the best bias and weight combination so the line is as close as possible to all data points.

Would you like me to add a small visual (graph) showing how the bias moves the line up/down and how the slope changes its angle?
It would make the concept of bias and weights much clearer visually.
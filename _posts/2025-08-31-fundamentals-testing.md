---
title: "Fundamentals Testing"
search: false
categories: 
  - Statistics
date: 2025-09-01
last_modified_at: 2025-09-01T08:06:00-06:00
share: linkedin
---



## Introduction
for be a good developer you need to know the fundamentals of testing

# what is testing
the coverage of your code with tests is a good indicator of the quality of your code.? 


## what is unit testing? 

a unit testing is a way to test a small part of code, like a function , a method or a class, to make sure it works as expected. basicakke you wrote a code that test another code wheer you ussualy test the input and the output of the code you want to test. in deeper version you can check the time of a a fucntion is called and also  how the parameters is passed to another function and even also raise exceptions and test how handle errors generating  erros an checkin the exceptions that are generated in certain situations.

## what is a mutations testing?

is a technique used to evaluate the effectiveness of software tests. It involves making small changes (mutations) to the code and checking if the existing tests can detect these changes. If a test fails after a mutation, it is said to have "killed" the mutant, indicating that the test is effective in catching potential issues.

sample of mutation testing in java
```java
// File: Calculator.java
package com.example.coursera.testing;

public class Calculator {
    public boolean isEven(int n) { return n % 2 == 0; }

    public boolean isPositive(int n) { return n >= 0; }
}
```

```java
// mutation
package com.example.coursera.testing;

public class CalculatorMutant {
    public boolean isEven(int n) { return n % 2 != 0; }

    public boolean isPositive(int n) { return n > 0; }
}
```

let's put the idea on test 

```java

public class Testing {

    static boolean pass(String msg) { System.out.println(msg); return true; }

    public static void main(String[] args) {
        Calculator ok = new Calculator();
        CalculatorMutant mutant = new CalculatorMutant();

        // ---------- WEAK TEST (single happy case) ----------
        // Only checks a positive number → both implementations look correct.
        boolean weakPass =
                ok.isPositive(5)       // true
                        && mutant.isPositive(5);  // also true → mutant "passes"

        if (weakPass) {
            System.out.println("WEAK TEST: PASS → Mutant SURVIVES ❌ (because we only tested 5)");
        } else {
            System.out.println("WEAK TEST: FAIL");
        }

        //exploring more cases even the lines are already covered improve the quality
        // for this purpose sample show how exploring more cases improve testing code agains mutation
        // ---------- STRONG TEST (add boundary) ----------
        // Add the boundary 0 → original true, mutant false → caught.
        boolean strongCatchesMutant =
                ok.isPositive(0)        // true
                        && !mutant.isPositive(0);  // false → detects the mutant

        if (strongCatchesMutant) {
            System.out.println("STRONG TEST: PASS (boundary 0) → Mutant KILLED ✅");
        } else {
            System.out.println("STRONG TEST: FAIL");
        }

    }

}
```





## certifications
[Introduction to Software Testing certificate](https://coursera.org/share/eb7a80f689d5f1f687e79276cadd00f8)

## References
- [https://www.baeldung.com/java-mutation-testing-with-pitest](https://www.baeldung.com/java-mutation-testing-with-pitest)
- https://www.reddit.com/r/PHP/comments/1n1mi6t/mutation_testing_with_infection/
---
title:  "Strategy Pattern"
search: false
categories: 
  - Fundamentals/patterns
date: 2022-04-25
last_modified_at: 2022-04-25T08:06:00-05:00
---

This is an example implementation of the Strategy pattern

## Concept
The Strategy Pattern, lets you define a family of algorithms, encapsulate each algorithm
(called a strategy), and select an algorithm at run time. The example below shows a farmer app with several filters  
to get apples based on criteria. You can see these criteria as different behaviors in the filter method. For more info, check strategy design pattern 
(see http://en.wikipedia.org/wiki/Strategy_pattern)



In this situation you have several ways to filter apples based on criteria like 
weight, color, or other factors.

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern-strategy_z1.png)
simple filter by color

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern-strategy_z2.png)
simple parametrized filter by color

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern-strategy_z3.png)
simple parametrized filter by weight

in the previous images you can see the easy way to resolve the problem , It works, but it repeats the non-bold code 
and breaks the DRY (don’t repeat yourself) principle of software engineering.You will need to repeat the code again if you want to mix filters or add new filters.


![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern-strategy_z4.png)
this image show a bad implementation for combining the filters of color and weight

perhaps, if you re-think the problem to decouple the behavior you requiered you can use this strategy pattern in this situation 
![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern-strategy_z6.png)

But it implies you must create a new class for each new requirement you have to add to the farmer app, but if it class is for single use
then you could use lambda expressions for simplify more the code and get more cleaner and less complexity on development
check the las lines on main class for see the new improvement.



**Note:** this is an example of Strategy patterns, it will be a series to implement all patterns in java / python / go
{: .notice--info}

in the next classes you can see the implementation for apply the builder pattern and how in the MainClass call all implemantation
for show usage, you can see the flexibility for use this structure in the problem for OOP with functional programming like lambdas functions

## Abstractions 

```java
interface ApplePredicate {
    boolean test(Apple a);
}
```

```java
static class AppleWeightPredicate implements ApplePredicate {

    @Override
    public boolean test(Apple apple) {
      return apple.getWeight() > 150;
    }
  }
```

```java
static class AppleColorPredicate implements ApplePredicate {

    @Override
    public boolean test(Apple apple) {
      return apple.getColor() == Color.GREEN;
    }
  }
```
```java
static class AppleRedAndHeavyPredicate implements ApplePredicate {

    @Override
    public boolean test(Apple apple) {
      return apple.getColor() == Color.RED && apple.getWeight() > 150;
    }
  }
```

## Usage
```java
public class MainClass {

	public static void main(String[] args) {
	
	List<Apple> inventory = Arrays.asList(
        new Apple(80, Color.GREEN),
        new Apple(155, Color.GREEN),
        new Apple(120, Color.RED));

		// [Apple{color=GREEN, weight=80}, Apple{color=GREEN, weight=155}]
    List<Apple> greenApples2 = filter(inventory, new AppleColorPredicate());
    System.out.println(greenApples2);

    // [Apple{color=GREEN, weight=155}]
    List<Apple> heavyApples = filter(inventory, new AppleWeightPredicate());
    System.out.println(heavyApples);

    // []
    List<Apple> redAndHeavyApples = filter(inventory, new AppleRedAndHeavyPredicate());
    System.out.println(redAndHeavyApples);
	}

	//Update JAVA 8 lambda Expresions for once use symplifies set of clasess
	List<Apple> result =  filterApples(inventory, (Apple apple) -> RED.equals(apple.getColor()));

	List<Apple> result =  filterApples(inventory, (Apple apple) -> apple.getColor() == Color.RED && apple.getWeight() > 150;);
	
}
```
finally I add this picture to review the idea of strategy pattern to conclude the topic
![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern-strategy_z5.png)

---
title:  "Bridge Pattern"
search: false
categories: 
  - Fundamentals/patterns
date: 2022-04-21
last_modified_at: 2022-04-21T08:06:00-05:00
---

This is an example for implementation for Bridge pattern

## Concept

Use the Bridge Pattern to vary not only your implementations but also your abstractions.




the next picture ilustrase easy the main idea.

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern-bridge-1.png)

when you have Abstraction and implementation(in the future it becomes in another abstraction), 
we can face we are creating a cartesian product, which is hell because it increments exponentially the code 
and That’s a very common issue with class inheritance, then came the bridge pattern for saving the sake, 
for avoiding that, the bridge pattern specifies the dependency implementation switch the inheritance 
for object composition, it allows changes on the implementation and the abstraction regardless

for example 

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern-bridge-2.png)



**Note:** this is an example of bridge patterns, its will be a series for implement all patterns in java / python / go
{: .notice--info}

in the next classes you can see the implementation for apply the bridge pattern and how in the MainClass call all implemantation
for show usage, you can see the flexibility for use this structure in the problem for OOP

## abstraccions 

```java
public abstract class Shape {

    protected Color color;

    protected Shape(Color color) {
        this.color = Color;
    }

    abstract public void applyColor();
}
```

```java
public abstract class Color {

	private String color;
    
    protected Color(String Color) {
        this.color = Color;
    }

	public void applyColor();

	//getters
	//seters

}
```



## Usage

```java
public class Triangle extends Shape{

	public Triangle(Color c) {
		super(c);
	}

	@Override
	public void applyColor() {
		System.out.print("Triangle filled with color ");
		color.applyColor();
	} 

}
```

```java
public class Pentagon extends Shape{

	public Pentagon(Color c) {
		super(c);
	}

	@Override
	public void applyColor() {
		System.out.print("Pentagon filled with color ");
		color.applyColor();
	} 

}
```

```java
public class RedColor implements Color{

	public void applyColor(){
		System.out.println("red.");
	}
}
```

```java
public class GreenColor implements Color{

	public void applyColor(){
		System.out.println("green.");
	}
}
```

```java
public class MainClass {

	 public static void main(String[] args){
		Shape tri = new Triangle(new RedColor());
		tri.applyColor();

		Shape pent = new Pentagon(new GreenColor());
		pent.applyColor();

    }
}
```

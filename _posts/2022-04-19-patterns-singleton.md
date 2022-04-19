---
title:  "Singleton Pattern"
search: false
categories: 
  - Fundamentals/patterns
date: 2022-04-19
last_modified_at: 2022-04-19T08:06:00-05:00
---

This is an example for implementation for singleton pattern

## Concept

The Singleton Pattern ensures a class has only one instance,
and provides a global point of access to it. this pattern prevent the classes 
create new instances of the class designed for be singleton.

singleton is often aplied for create a global resource and all uses of that requiered resource use the same instance,
for improve de handle of memory, performarce or avoid overuse, singleton is a good aproach if you must to control the number of instances you’re creating



**Note:** this is an example of singleton patterns, its will be a series for implement all patterns in java / python / go
{: .notice--info}

in the next classes you can see the implementation for apply the singleton pattern and how in the MainClass call all implemantationfor show usage, 
you can see the flexibility for use this structure in the problem for OOP

## abstraccions 

clasical abstraccion
```java
public class Singleton {
	private static Singleton uniqueInstance = new Singleton();
 
	private Singleton() {}
 
	public static Singleton getInstance() {
		return uniqueInstance;
	}
	
	// other useful methods here
	public String getDescription() {
		return "I'm a statically initialized Singleton!";
	}
}
```

for handle multithreading , you must "synchronized" the acces for avoid locks
```java
public class Singleton {
	private static Singleton uniqueInstance;
 
	// other useful instance variables here
 
	private Singleton() {}
 
	public static synchronized Singleton getInstance() {
		if (uniqueInstance == null) {
			uniqueInstance = new Singleton();
		}
		return uniqueInstance;
	}
 
	// other useful methods here
	public String getDescription() {
		return "I'm a thread safe Singleton!";
	}
}
```

## Usage




```java
public class MainClass {
    
	ppublic static void main(String[] args) {
		Singleton singleton = Singleton.getInstance();
		System.out.println(singleton.getDescription());
	}
}

// for safe threadsafe
public class MainClass2 {
    
	public static void main(String[] args) {
		//the code is the same , but try it from different instances
		Singleton singleton = Singleton.getInstance();
		System.out.println(singleton.getDescription());
	}
}
```

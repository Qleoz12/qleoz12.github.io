---
title:  "Adapter Pattern"
search: false
categories: 
  - Fundamentals/patterns
date: 2022-04-18
last_modified_at: 2022-04-18T08:06:00-05:00
---

This is an example for implementation for Adapter pattern

## concept

The Adapter Pattern converts the interface of a class into
another interface the clients expect. Adapter lets classes work
together that couldn’t otherwise because of incompatible
interfaces



**Note:** this is an example of Adapter patterns, its will be a series for implement all patterns in java / python / go
{: .notice--info}

in the next classes you can see the implementation for apply the Adapter pattern and how in the MainClass call all implemantationfor show usage, 
you can see the flexibility for use this structure in the problem ducks and turkeys

## abstraccions 

```java
public interface Duck {
	public void quack();
	public void fly();
}
```
```java
public interface Turkey {
	public void gobble();
	public void fly();
}
```

```java
public class TurkeyAdapter implements Duck {
	Turkey turkey;
 
	public TurkeyAdapter(Turkey turkey) {
		this.turkey = turkey;
	}
    
	public void quack() {
		turkey.gobble();
	}
  
	public void fly() {
		for(int i=0; i < 5; i++) {
			turkey.fly();
		}
	}
}
```
```java
public class DuckAdapter implements Turkey {
	Duck duck;
	Random rand;
 
	public DuckAdapter(Duck duck) {
		this.duck = duck;
		rand = new Random();
	}
    
	public void gobble() {
		duck.quack();
	}
  
	public void fly() {
		if (rand.nextInt(5)  == 0) {
		     duck.fly();
		}
	}
}
```
```java
public interface Drone {
	public void beep();
	public void spin_rotors();
	public void take_off();
}
```
```java
public class DroneAdapter implements Duck {
	Drone drone;
 
	public DroneAdapter(Drone drone) {
		this.drone = drone;
	}
    
	public void quack() {
		drone.beep();
	}
  
	public void fly() {
		drone.spin_rotors();
		drone.take_off();
	}
}
```
## Usage


```java
public class MallardDuck implements Duck {
	public void quack() {
		System.out.println("Quack");
	}
 
	public void fly() {
		System.out.println("I'm flying");
	}
}

```

```java
public class WildTurkey implements Turkey {
	public void gobble() {
		System.out.println("Gobble gobble");
	}
 
	public void fly() {
		System.out.println("I'm flying a short distance");
	}
}
```

```java
public class SuperDrone implements Drone {
	public void beep() {
		System.out.println("Beep beep beep");
	}
	public void spin_rotors() {
		System.out.println("Rotors are spinning");
	}
	public void take_off() {
		System.out.println("Taking off");
	}
}
```


```java
public class MainClass {
    
	public static void main(String[] args) {
		Duck duck = new MallardDuck();

		Turkey turkey = new WildTurkey();
		Duck turkeyAdapter = new TurkeyAdapter(turkey);

		System.out.println("The Turkey says...");
		turkey.gobble();
		turkey.fly();

		System.out.println("\nThe Duck says...");
		testDuck(duck);

		System.out.println("\nThe TurkeyAdapter says...");
		testDuck(turkeyAdapter);
		
		// Challenge
		Drone drone = new SuperDrone();
		Duck droneAdapter = new DroneAdapter(drone);
		testDuck(droneAdapter);
	}

	static void testDuck(Duck duck) {
		duck.quack();
		duck.fly();
	}
}
```

---
title:  "Decorator pattern"
search: false
categories: 
  - Fundamentals/patterns
last_modified_at: 2022-04-14T08:06:00-05:00
---

This is an example for implementation for decorator patter 



**Note:** this is an example od decorator patterns, its will be a series for implement all patterns in java / python / go
{: .notice--info}

in the next classes you can see the implementation for apply the decorator patter and how in the MainClass 
you can see the flexibility for use this strcuture in the problem for OOP on Stabuzz coffe 

abstraccions 

```java
  public abstract class AbstactBeverage {
    protected abstract String getDescription();
    protected abstract Double cost();
}
```

```java
public abstract class AbstractCondiment extends AbstactBeverage {
}
```

Usage

```java
public class Blacktea extends AbstactBeverage {
    @Override
    protected String getDescription() {
        return "???";
    }

    @Override
    protected Double cost() {
        return new Double(10);
    }
}
```


```java
public class Coffeetea extends AbstactBeverage {
    @Override
    protected String getDescription() {
        return "????";
    }

    @Override
    protected Double cost() {
        return new Double(2000);
    }
}
```


```java
public class Greentea extends AbstactBeverage {
    @Override
    protected String getDescription() {
        return "???";
    }

    @Override
    protected Double cost() {
        return new Double(200);
    }
}
```


```java
public class Lemon extends AbstractCondiment {
    AbstactBeverage abstactBeverage;

    public Lemon(AbstactBeverage abstactBeverage) {
        this.abstactBeverage=  abstactBeverage;
    }

    @Override
    protected String getDescription() {
        return abstactBeverage.getDescription()+"??????";
    }

    @Override
    protected Double cost() {
        return abstactBeverage.cost()+11;
    }
}
```

```java
public class MainClass {
    public static void main(String[] args) {
        Blacktea blacktea = new Blacktea();
        System.out.println("???=="+blacktea.getDescription()+",???"+blacktea.cost());
        Lemon lemon = new Lemon(blacktea);
        System.out.println("???????????=="+lemon.getDescription()+",???"+lemon.cost());
    }
}
```

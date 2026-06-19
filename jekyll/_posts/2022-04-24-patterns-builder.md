---
title:  "Builder Pattern"
search: false
categories: 
  - Fundamentals/patterns
date: 2022-04-24
last_modified_at: 2022-04-24T08:06:00-05:00
---

This is an example for implementation for Builder pattern

## Concept
Use the BuilderPattern to encapsulate the construction of a
product and allow it to be constructed in steps.


the situation is when you must to face several ways to create some kind element depeding combination of several parameters 
![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern_builder.png)

Separate the construction of a complex object from its representation so that the
same construction process can create different representations

it´s looks similar at umls repreentation but its focus an abstraction how exposes the easy way for set all needs for create the object requiered
![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern_builder-1.png)


**Note:** this is an example of builder patterns, its will be a series for implement all patterns in java / python / go
{: .notice--info}

in the next classes you can see the implementation for apply the builder pattern and how in the MainClass call all implemantation
for show usage, you can see the flexibility for use this structure in the problem for OOP

## abstraccions 

```java
public abstract class VacationBuilder {
	String name;
	List<Accommodation> accommodations = new ArrayList<Accommodation>();
	List<String> events = new ArrayList<String>();
	
	public abstract VacationBuilder addAccommodation();
	public abstract VacationBuilder addAccommodation(String name);
	public abstract VacationBuilder addAccommodation(String name, int year, int month, int day, int nights, int location);
	public abstract VacationBuilder addEvent(String event);
	
	public Vacation getVacation() {
		Vacation vacation = new Vacation();
		vacation.setName(name);
		vacation.setAccommodations(accommodations);
		vacation.setEvents(events);
		return vacation;
	}
}
```

```java
public class Vacation {
	String name;
	List<Accommodation> accommodations = new ArrayList<Accommodation>();
	List<String> events = new ArrayList<String>();
 
	public void setName(String name) {
		this.name = name;
	}
	public void setAccommodations(List<Accommodation> accommodations) {
		this.accommodations = accommodations;
	}
	public void setEvents(List<String> events) {
		this.events = events;
	}
	public String toString() {
		StringBuffer display = new StringBuffer();
		display.append("---- " + this.name + " ----\n");
		for (Accommodation a : accommodations) {
			display.append(a);
		}
		for (String e : events) {
			display.append(e + "\n");
		}
		return display.toString();
	}
}
```

```java
public class Tent extends Accommodation {
	int siteNumber;
	public Tent() {
		this.name = "Tent";
	}
	public Tent(String name) {
		this.name = name;
	}
	public void setSiteNumber(int n) {
		this.siteNumber = n;
	}
	public int getSiteNumber() {
		return this.siteNumber;
	}
	public String getLocation() {
		if (siteNumber == 0) return "";
		else return "Site number " + this.siteNumber;
	}
}
```


## Usage

```java
public class OutdoorsVacationBuilder extends VacationBuilder {	
	public OutdoorsVacationBuilder() {
		this.name = "Outdoorsy Vacation Builder";
	}
	public VacationBuilder addAccommodation() {
		this.accommodations.add(new Tent());
		return this;
	}
	public VacationBuilder addAccommodation(String name) {
		this.accommodations.add(new Tent(name));
		return this;
	}
	public VacationBuilder addAccommodation(String name, int year, int month, int day, int nights, int location) {
		Reservation reservation = new Reservation();
		reservation.setArrivalDate(year, month, day);
		reservation.setNights(nights);
		
		Tent tent = new Tent(name);
		tent.setReservation(reservation);
		tent.setSiteNumber(location);
		this.accommodations.add(tent);
		return this;
	}
	public VacationBuilder addEvent(String event) {
		this.events.add("Hike: " + event);
		return this;
	}
}
```

```java
public class CityVacationBuilder extends VacationBuilder {	
	public CityVacationBuilder() {
		this.name = "City Vacation Builder";
	}
	public VacationBuilder addAccommodation() {
		this.accommodations.add(new Hotel());
		return this;
	}
	public VacationBuilder addAccommodation(String name) {
		this.accommodations.add(new Hotel(name));
		return this;
	}
	public VacationBuilder addAccommodation(String name, int year, int month, int day, int nights, int location) {
		Reservation reservation = new Reservation();
		reservation.setArrivalDate(year, month, day);
		reservation.setNights(nights);
		
		Hotel hotel = new Hotel(name);
		hotel.setReservation(reservation);
		hotel.setRoomNumber(location);
		this.accommodations.add(hotel);
		return this;
	}
	public VacationBuilder addEvent(String event) {
		this.events.add("See the " + event + " show");
		return this;
	}
}
```


```java
public class MainClass {

	public static void main(String[] args) {
		VacationBuilder outdoorsyVacationBuilder = new OutdoorsVacationBuilder();
		Vacation outdoorsyVacation = outdoorsyVacationBuilder
				.addAccommodation("Two person tent", 2020, 7, 1, 5, 34)
				.addEvent("Beach")
				.addAccommodation("Two person tent")
				.addEvent("Mountains")
				.getVacation();
		System.out.println(outdoorsyVacation);
		
		VacationBuilder cityVacationBuilder = new CityVacationBuilder();
		Vacation cityVacation = cityVacationBuilder
				.addAccommodation("Grand Facadian", 2020, 8, 1, 5, 0)
				.addAccommodation("Hotel Commander", 2020, 8, 6, 2, 0)
				.addEvent("Cirque du Soleil")
				.getVacation();
		System.out.println(cityVacation);
	}
}
```

---
title:  "Java SplitIterator"
search: false
categories: 
  - Java/JDK8
date: 2022-06-25
last_modified_at: 2022-06-25T08:06:00-05:00
---

## Concept
SplitIterator is a new interface, it comes with JDK 8, the main functionalities of split iterator is 

- split the data-structure
- iterate the chunks

Split iterator was create for sake to improve the way to implement parallelism because, 
if you use SplitIterator API with Stream API, you could get an advance 
'*Internal iteration allows you to process a stream in parallel without the need to
explicitly use and coordinate different threads in your code.*'

Spliterator itself does not provide the parallel programming behavior. However, 
it provides some methods to support it. 
Developers should utilize Spliterator interface methods and implement 
parallel programming by using Fork/Join Framework (one good approach).


It is an Iterator for whole Collection API.	It is an Iterator for both Collection and Stream API, except Map implemented classes.
It is an Universal Iterator.	It is NOT an Universal Iterator.
It does NOT support Parallel Programming.	It supports Parallel Programming.

| Iterator      | Spliterator |
| ----------- | ----------- |
|Introduced in Java 1.2.   | Introduced in Java 1.8.       |
| It is an Iterator for whole Collection API.   | It is an Iterator for both Collection and Stream API, except Map implemented classes.        |
|It is an Universal Iterator.|	It is NOT an Universal Iterator.|
|It does NOT support Parallel Programming.|It supports Parallel Programming.|

in the next interface image, we can see the methods oof the Splititerator
![alt]({{ site.url }}{{ site.baseurl }}/assets/images/java/splititerator.png) 
---
title:  "Domain Driven Design"
search: false
categories: 
  - Development Aproach
date: 2023-01-07
last_modified_at: 2023-01-07T08:06:00-05:00
---

## Concept

DDD is a key design practice that helps to design the microservices of the product that you are
developing, into DDD the mainstay is de DOMAIN, and with a good desing and the fundamentals to apply
DDD aproach is usually for complex systems that requiere a clear and good arquitecture and layered, decouple
segregate structure. 

the fundamentals inside DDD  are 

- Ubiquitous language and unified model language (UML)
- Multilayer architecture
- Artifacts (components)


## Ubiquitous language
the comunication and desings with Ubiquitous language,  
let us remove the misundestanding ,misinterpretation 
and comunications gaps among them, using UML and the 
collective of diagrams and 
desings allow evade the ambiguty or definition unique per bounded context, 
for now think in it as a field where all logical componets related are setted

## Multilayer architecture
the common way to decouple the componets inside an application, in diferent layers tha have
single responsability and each layer are connect between them

1. Presentation layer or User Interface (UI).
2. Application layer.
3. Domain layer.
4. Infrastructure layer.


## Artifacts of domain-driven design

There are seven different artifacts used in DDD to express, create, and retrieve domain models:

1. Entities
2. Value objects
3. Services
4. Aggregates
5. Repository
6. Factory
7. Module

References: 
- https://vladikk.com/2018/01/21/bounded-contexts-vs-microservices/
- https://medium.com/@jonathanloscalzo/domain-driven-design-principios-beneficios-y-elementos-primera-parte-aad90f30aa35
---
layout: single
permalink: /kafka/lab-setup-windows/
title: "Kafka Lab — Windows Setup"
categories:
  - Learning
  - Backend
  - Kafka
  - Labs
date: 2026-09-02
toc: true
author_profile: true
---

Operational guide to run the lab locally on Windows. For curls and test cases see [Try it yourself](/kafka/kafka-lab-try-it-yourself/).

## Requirements

- Docker (`docker compose`)
- JDK **17** (Spring Boot 3)
- Maven (`mvn` — do not use `mvnw` in this lab)
- JEnv (optional; lab scripts use it)

## Ports

| Service | Port |
|---------|------|
| Producer | 8097 |
| Consumer | 8197 |
| Kafdrop | 19000 |
| Kafka | 9092 |

## Java 17 (one time)

```cmd
cd D:\Backup\develop\curso-apache-kafka-master
jenv local jdk17
java -version
```

If Maven still reports Java 8, set `JAVA_HOME` explicitly:

```powershell
$env:JAVA_HOME = "D:\java\corretto-17.0.13-2"
mvn -version
```

## Startup order

1. **Kafka stack:** `docker compose up -d` → verify with `docker compose ps`
2. **Consumer** (terminal 1): `run-consumer.bat` or `mvn spring-boot:run` in `str-consumer`
3. **Producer** (terminal 2): `run-producer.bat` or `mvn spring-boot:run` in `str-producer`
4. **Test:** `curl -X POST http://localhost:8097/casos/01-basico -H "Content-Type: text/plain" -d "Hola Kafka"`

Kafdrop UI: http://localhost:19000

## Common pitfalls

| Problem | Solution |
|---------|----------|
| `mvnw` fails | Use `mvn` or `run-*.bat` scripts |
| `java -version` ≠ Maven Java | Set `JAVA_HOME` to JDK 17 |
| JEnv broken global | `jenv local jdk17` in project root |

## What this lab uses (and does not)

| Included | Not in this lab |
|----------|-----------------|
| Spring Kafka (Cases 01–07) | ksqlDB |
| Kafka Streams (Case 08 — `str-streams`) | Spring `@EnableKafkaStreams` (uses plain `KafkaStreams` API) |

## Related

- [Kafka Streams — Pipe, LineSplit, WordCount](/kafka/apache-kafka-streams-pipe-linesplit-wordcount/)

- [Try it yourself (cURL)](/kafka/kafka-lab-try-it-yourself/)
- [Lab architecture](/kafka/apache-kafka-lab-architecture/)
- [Concepts](/kafka/apache-kafka-concepts-i-learned/)

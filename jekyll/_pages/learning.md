---
layout: single
permalink: /learning/
title: "Learning"
author_profile: true
toc: true
---

Hands-on study notes from **labs and courses I actually built and ran** — not theory in a vacuum.  
Each track links to **source code**, **how to run it**, and **what each example proves**.

---

## Apache Kafka Lab (featured)

A local lab with **8 practical cases** (Spring Boot + Kafka Streams).  
You can clone it, run it, and match every blog post to real code.

| Resource | Link |
|----------|------|
| **Source code (GitHub)** | [Qleoz12/curso-apache-kafka-master](https://github.com/Qleoz12/curso-apache-kafka-master) |
| **Run on Windows** | [Kafka Lab — Windows Setup](/kafka/lab-setup-windows/) |
| **Copy-paste cURL** | [Try It Yourself](/kafka/kafka-lab-try-it-yourself/) |

### What is in the repo?

Three runnable modules:

| Module | Port | Role |
|--------|------|------|
| **str-producer** | 8097 | REST API — you send HTTP here; it publishes to Kafka |
| **str-consumer** | 8197 | `@KafkaListener` — processes messages (Cases 01–07) |
| **str-streams** | — | Kafka Streams topologies (Case 08a/b/c) |
| **Kafka + Kafdrop** | 9092 / 19000 | Broker + UI to inspect topics |

```text
HTTP (curl/Postman) → str-producer :8097 → Kafka :9092 → str-consumer :8197
                                              ↓
                                    str-streams (Case 08 only)
```

**Golden rule:** to *publish* a message, always call the **producer (8097)**.  
The consumer (8197) is for logs and Case 07 GET queries — not for sending lab messages.

### All cases — what each one does

Use this table to find the example you need. Full curls are in [Try It Yourself](/kafka/kafka-lab-try-it-yourself/).

| Case | What you learn | HTTP endpoint | Kafka topic | What to verify |
|------|----------------|---------------|-------------|----------------|
| **01** | Basic producer/consumer, partitions, consumer groups | `POST /casos/01-basico` | `str-topic` | Producer logs partition/offset; consumer logs `[CASO-01]` |
| **02** | Message **key** → same key, same partition, order per entity | `POST /casos/02-con-key` | `order-topic` | Same `orderId` always same partition |
| **03** | **JSON events**, typed serialization | `POST /casos/03-evento-json` | `user-event-topic` | Consumer logs user action (`LOGIN`, etc.) |
| **04** | **Retry + Dead Letter Topic** on invalid data | `POST /casos/04-pago` | `payment-topic` | Valid payment succeeds; negative amount → DLT after retries |
| **05** | **Request-reply** over Kafka (sync HTTP, async broker) | `POST /casos/05-request-reply` | `request-topic` / `reply-topic` | HTTP body `Echo: ...` |
| **06** | **RecordInterceptor** — filter/transform before listener | `POST /casos/06-texto-filtro` | `text-filter-topic` | Tabulated analysis in consumer logs |
| **07** | Kafka → **SQLite** persistence + REST read API | `POST /casos/07-inventario` | `inventory-topic` | `GET /casos/07-inventario/resumen` on **8197** |
| **08a** | Kafka Streams **Pipe** (passthrough topology) | `POST /casos/08a-pipe` | `streams-plaintext-input` → `streams-pipe-output` | Run `run-streams-pipe.bat`; check Kafdrop |
| **08b** | Kafka Streams **LineSplit** (`flatMapValues`) | `POST /casos/08b-linesplit` | → `streams-linesplit-output` | One line becomes many words in output topic |
| **08c** | Kafka Streams **WordCount** (`groupBy` + `count` + KTable) | `POST /casos/08c-wordcount` | → `streams-wordcount-output` | Word counts in Kafdrop; state store `counts-store` |

**Case 08:** start **one** Streams app (`run-streams-pipe.bat`, `linesplit`, or `wordcount`). Consumer (8197) is **not** required for Case 08.

### Suggested reading order (Kafka)

Read in this order if you are new to the lab:

1. [Architecture](/kafka/apache-kafka-lab-architecture/) — who does what (producer vs consumer vs streams)
2. [Concepts I Learned](/kafka/apache-kafka-concepts-i-learned/) — broker, topic, partition, DLT, interview notes
3. [Try It Yourself](/kafka/kafka-lab-try-it-yourself/) — run every case with cURL
4. [Kafka Streams — Pipe, LineSplit, WordCount](/kafka/apache-kafka-streams-pipe-linesplit-wordcount/) — Case 08 deep dive

### Quick start (local)

```text
1. git clone https://github.com/Qleoz12/curso-apache-kafka-master
2. docker compose up -d
3. run-consumer.bat          (Cases 01–07; skip for 08)
4. run-producer.bat
5. curl → see Try It Yourself post
6. Kafdrop → http://localhost:19000
```

For JDK 17 / JEnv on Windows: [setup guide](/kafka/lab-setup-windows/).

---

## Data & statistics (course notes)

Notes from **DANA 4830 / 4840** and related coursework — R, clustering, feature selection.

| Topic | Start here |
|-------|------------|
| Feature selection (paper overview) | [DANA 4830 — Feature selection paper](/statistics/machine%20learning/dana-4830-feature-selection-paper-overview/) |
| Univariate selection | [Chi2, ANOVA, MI, Pearson, ReliefF](/statistics/machine%20learning/dana-4830-univariate-feature-selection/) |
| Multivariate (mRMR, CFS) | [Part 1](/statistics/machine%20learning/dana-4830-multivariate-feature-selection-part1/) · [Part 2](/statistics/machine%20learning/dana-4830-multivariate-feature-selection-part2/) |
| Clustering & distances | [Year archive](/year-archive/) — filter posts tagged statistics |

---

## SQL & fundamentals

| Topic | Post |
|-------|------|
| SQL (HackerRank review) | [Fundamentals SQL](/sql/fundamentals-sql-hackerRank/) |
| Testing basics | [Fundamentals testing](/statistics/fundamentals-testing/) |
| Correlations & p-values | [Stats correlations](/statistics/stats-correlations-and-pvalue-models/) |

More: [year archive](/year-archive/) or [categories](/categories/).

---

## How these posts are written

Each technical post tries to answer:

- **What** is the concept?
- **Why** does it exist?
- **Where** does it appear in my lab or project?
- **Example** you can run
- **Interview version** — 1–3 sentences

If you only want runnable examples, use the **case table** above and [Try It Yourself](/kafka/kafka-lab-try-it-yourself/).

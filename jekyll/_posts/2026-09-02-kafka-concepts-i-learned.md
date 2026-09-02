---
title: "Apache Kafka — Concepts I Learned"
permalink: /kafka/apache-kafka-concepts-i-learned/
categories:
  - Learning
  - Backend
  - Kafka
date: 2026-09-02
toc: true
author_profile: true
---

**Practice repo:** [github.com/Qleoz12/curso-apache-kafka-master](https://github.com/Qleoz12/curso-apache-kafka-master) — clone it, run the eight cases, and map each concept below to real code.

I first heard about Apache Kafka around **2019**. I understood the basics (broker, topic, producer, consumer), but I had not sat down to **practice** it end-to-end in a while. RabbitMQ was already familiar — queues, exchanges, routing — and Kafka feels related: both are about moving messages between services without tight coupling. In real backends you constantly touch **APIs, microservices, and queues**; Kafka keeps showing up in job posts and system diagrams, so skipping hands-on practice did not make sense.

I retook it with a local Spring Boot lab (**str-producer** on **8097**, **str-consumer** on **8197**, Kafka on **9092**, Kafdrop on **19000**). This page is my cheat sheet while running that repo. For curls and every endpoint, see [Try It Yourself](/kafka/kafka-lab-try-it-yourself/); for the full case index, see the [Learning hub](/learning/#apache-kafka-lab-featured).

### References (credit where I refreshed ideas)

These videos helped me reconnect theory with practice — especially the Spring Kafka course:

| Video | Channel |
|-------|---------|
| [#1 Qué es Apache Kafka — Curso Spring Kafka de Cero a Experto](https://www.youtube.com/watch?v=KY7dH3ksf2s) | [DavinchiCoder](https://www.youtube.com/@davinchicoder) |
| [Domina Apache Kafka y multiplica tus oportunidades laborales](https://youtu.be/l4-wAvFYKCY) | [La Tecnología Avanza](https://www.youtube.com/@latecnologiaavanza) |
| [Kafka en 10 minutos — Conceptos esenciales y arquitectura](https://youtu.be/_nJfL-AwW80) | [pirobits](https://www.youtube.com/@pirobits) |

The lab code is mine; the explanations above lean on those creators for structure and motivation.

---

### Broker

**Definition:** A Kafka server that stores topics, serves producers and consumers, and coordinates partitions.

**Why it matters:** Brokers are the runtime of Kafka; clustering them gives fault tolerance and scale.

**In my project:** Kafka listens on **9092**; Kafdrop (**19000**) connects to the same cluster for inspection.

**Example:** `localhost:9092` in Spring `application.yml` bootstrap servers.

**Interview version:** A Kafka broker is a node that persists topic partitions and handles produce/fetch requests. A production cluster runs multiple brokers for replication and availability.

---

### Topic

**Definition:** A named, append-only log category where producers publish and consumers subscribe.

**Why it matters:** Topics decouple producers from consumers and let many services share the same event stream.

**In my project:** Each lab case uses its own topic (basic message, keyed messages, JSON events, retry/DLT, request-reply, filter, inventory).

**Example:** Producer REST receives HTTP, then publishes to the configured topic via `KafkaTemplate`.

**Interview version:** A topic is a logical channel of records. Producers write to topics; consumers read from them without knowing who produced the data.

---

### Partition

**Definition:** A topic is split into ordered partitions; each partition is an ordered, immutable sequence of records.

**Why it matters:** Partitions enable parallelism: multiple consumers in a group can read different partitions at once.

**In my project:** Lab **02** demonstrates message keys and ordering **within** a partition.

**Example:** Three keys → three partition streams; same key → same partition → order preserved per key.

**Interview version:** Partitions are Kafka's unit of parallelism. Ordering is guaranteed per partition, not globally across a topic.

---

### Offset

**Definition:** A monotonically increasing ID of a record within a partition.

**Why it matters:** Consumers track offsets to know what they have processed and to replay if needed.

**In my project:** Visible in Kafdrop and consumer logs when processing lab messages.

**Example:** After consuming partition 0 up to offset 42, the consumer commits offset 43 as the next read position.

**Interview version:** An offset is the position of a message in a partition. Consumer groups commit offsets to resume after restarts without reprocessing everything.

---

### Producer

**Definition:** A client that sends records to Kafka topics.

**Why it matters:** Producers are the entry point for event-driven systems.

**In my project:** **str-producer** (Spring Boot, port **8097**) exposes REST; HTTP requests become Kafka records.

**Example:** `POST` to producer REST → message published to topic.

**Interview version:** A producer serializes records and sends them to a topic partition, optionally using a key for routing.

---

### Consumer

**Definition:** A client that reads records from Kafka topics.

**Why it matters:** Consumers implement business logic reacting to events asynchronously.

**In my project:** **str-consumer** (port **8197**) uses `@KafkaListener` to process messages from topics.

**Example:** Listener method receives `ConsumerRecord` and applies domain logic (log, transform, persist).

**Interview version:** A consumer subscribes to topics, fetches records, processes them, and commits offsets.

---

### Consumer Group

**Definition:** A set of consumers that cooperate to consume a topic; each partition is assigned to at most one consumer in the group.

**Why it matters:** Groups scale consumption horizontally without duplicate processing per partition.

**In my project:** Consumer `group-id` in Spring config defines which group processes lab topics.

**Example:** Two instances with the same `group-id` split partitions; two different groups each get a full copy of the stream.

**Interview version:** Consumer groups enable scalable consumption. Kafka assigns each partition to one consumer in the group at a time.

---

### Message Key

**Definition:** Optional bytes sent with a record used to choose the target partition.

**Why it matters:** Keys colocate related events for ordered processing per entity.

**In my project:** Lab **02** — same key → same partition → order per key.

**Example:** Key `order-123` always lands in the same partition.

**Interview version:** Message keys route related events to the same partition so ordering holds for that key.

---

### Serialization

**Definition:** Converting an object or payload into bytes for Kafka.

**Why it matters:** Kafka only stores bytes; serializers define the on-wire format.

**In my project:** String serializer for simple labs; JSON serializer for event payloads (lab **03**).

**Example:** `JsonSerializer` on `KafkaTemplate` for typed events.

**Interview version:** Serialization turns application objects into bytes. Producer and consumer must agree on format and schema.

---

### Deserialization

**Definition:** Converting Kafka bytes back into application objects.

**Why it matters:** Consumers need compatible deserializers with producers.

**In my project:** `@KafkaListener` methods deserialize JSON events in lab **03**.

**Example:** `JsonDeserializer` configured with trusted packages for Spring Kafka.

**Interview version:** Deserialization is the inverse of serialization at the consumer. Mismatched serializers cause poison messages or failures.

---

### KafkaTemplate

**Definition:** Spring abstraction for sending messages to Kafka.

**Why it matters:** Simplifies sync/async sends, headers, and topic selection.

**In my project:** Primary send path in **str-producer**; also used in **str-consumer** for retry, DLT, and reply (infrastructure, not main business ingress).

**Example:** `kafkaTemplate.send(topic, key, payload)`.

**Interview version:** `KafkaTemplate` is Spring's producer API. Having it in a consumer service usually means retry, DLT, or reply — not that the service is the main HTTP producer.

---

### @KafkaListener

**Definition:** Spring annotation declaring a method as a Kafka message handler.

**Why it matters:** Declarative consumption with container-managed threading and acks.

**In my project:** Core pattern in **str-consumer** for all seven lab cases.

**Example:**

```java
@KafkaListener(topics = "my-topic", groupId = "my-group")
public void listen(String message) { ... }
```

**Interview version:** `@KafkaListener` registers a consumer method. Spring Kafka manages polling, deserialization, and error handling hooks.

---

### Retry Topic

**Definition:** A secondary topic where failed messages are republished for delayed reprocessing.

**Why it matters:** Retries transient failures without blocking the main consumer thread indefinitely.

**In my project:** Lab **04** — retry flow before sending to DLT.

**Example:** Processing fails → message routed to retry topic → consumer retries with backoff.

**Interview version:** Retry topics decouple immediate failure from re-attempts, often with backoff, instead of infinite in-process retries.

---

### Dead Letter Topic (DLT)

**Definition:** A topic that stores messages that failed after retries, for manual inspection or alternate handling.

**Why it matters:** Prevents poison messages from blocking the pipeline forever.

**In my project:** Lab **04** — final destination when retries are exhausted.

**Example:** `@DltHandler` or Spring Kafka non-blocking retry sends to `*.DLT` topic.

**Interview version:** A DLT quarantines messages that cannot be processed. Operators fix data or replay after correcting the bug.

---

### Request-Reply

**Definition:** A pattern where a consumer sends a reply record correlated to the original request, often via a reply topic.

**Why it matters:** Enables RPC-style workflows over Kafka while keeping async transport.

**In my project:** Lab **05** — correlation between request and response topics.

**Example:** Request carries `correlationId` header; reply producer uses the same id.

**Interview version:** Request-reply over Kafka uses correlation IDs and reply topics. It simulates RPC but remains event-driven at the broker level.

---

### Correlation ID

**Definition:** An identifier linking a request message to its reply.

**Why it matters:** Essential when many in-flight request-reply pairs share topics.

**In my project:** Lab **05** request-reply flow.

**Example:** Header `kafka_correlationId` matches pending client callback.

**Interview version:** Correlation IDs let clients match asynchronous replies to the original request in request-reply patterns.

---

### RecordInterceptor

**Definition:** Hook that inspects or modifies records (or headers) before listener invocation.

**Why it matters:** Cross-cutting concerns: filtering, MDC logging, metrics, dropping bad records.

**In my project:** Lab **06** — text filter / interceptor behavior.

**Example:** Interceptor drops or flags messages that fail a text rule before `@KafkaListener` runs.

**Interview version:** Record interceptors implement cross-cutting consumer logic without polluting every listener method.

---

### Event-driven architecture

**Definition:** Services communicate by producing and consuming events instead of synchronous direct calls.

**Why it matters:** Loose coupling, independent scaling, and temporal decoupling.

**In my project:** HTTP → producer → Kafka → consumer replaces a single monolithic request chain.

**Example:** Inventory update event consumed asynchronously (lab **07**).

**Interview version:** Event-driven architecture uses a broker so producers and consumers evolve independently and scale on different axes.

---

### Decoupling

**Definition:** Reducing direct dependencies between services so changes on one side do not ripple immediately to the other.

**Why it matters:** Kafka buffers and persists; consumers can be down without losing events (within retention).

**In my project:** Producer does not call consumer HTTP; only Kafka sits between them.

**Example:** Spike in HTTP traffic is absorbed by the broker while consumers catch up.

**Interview version:** Kafka decouples producers and consumers in time and space — they only share topic contracts, not deployment or availability.

---

### Horizontal scaling

**Definition:** Adding more instances instead of bigger machines.

**Why it matters:** Kafka scales reads via partitions + consumer groups; writes via more partitions and brokers.

**In my project:** Run multiple consumer instances with the same `group-id` to parallelize partition processing.

**Example:** 6 partitions, 3 consumers → ~2 partitions each.

**Interview version:** Horizontal scaling in Kafka means more partitions and more consumers in a group, bounded by partition count.

---

## Lab index (my eight cases)

| # | Topic |
|---|--------|
| 01 | Basic Kafka message |
| 02 | Message key and partition ordering |
| 03 | JSON events |
| 04 | Retry + Dead Letter Topic |
| 05 | Request-reply |
| 06 | Text filter / interceptor |
| 07 | Kafka → inventory / DB persistence |
| 08 | Kafka Streams (Pipe, LineSplit, WordCount) |

See [Lab architecture](/kafka/apache-kafka-lab-architecture/) for diagrams and ports.

### Kafka Streams concepts (Case 08)

| Concept | Where |
|---------|--------|
| KStream | `str-streams` — `builder.stream()` |
| KTable | WordCount — `.count()` |
| Topology | `topology.describe()` on startup |
| State Store | `counts-store` in WordCount |
| APPLICATION_ID | `streams-pipe`, `streams-linesplit`, `streams-wordcount` |

Full walkthrough: [Kafka Streams — Pipe, LineSplit, WordCount](/kafka/apache-kafka-streams-pipe-linesplit-wordcount/).

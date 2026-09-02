---
title: "Apache Kafka Lab — Try It Yourself (cURL)"
permalink: /kafka/kafka-lab-try-it-yourself/
categories:
  - Learning
  - Backend
  - Kafka
  - Labs
date: 2026-09-02
toc: true
author_profile: true
---

Hands-on curls for my **str-producer / str-consumer** lab. Source: `curso-apache-kafka-master/POSTMAN-CURL.md` (local study repo).

**Before you start:**

1. `docker-compose up -d` (Kafka + Kafdrop)
2. Start **str-consumer** (port **8197**)
3. Start **str-producer** (port **8097**)
4. Open Kafdrop: http://localhost:19000

> HTTP requests go to the **producer (8097)**. The consumer (8197) reads from Kafka — it does not expose `/casos` for publishing.

See [Lab architecture](/kafka/apache-kafka-lab-architecture/) · [Concepts](/kafka/apache-kafka-concepts-i-learned/) · [Windows setup](/kafka/lab-setup-windows/)

---

## Quick reference

| Service | URL |
|---------|-----|
| Producer API | http://localhost:8097 |
| Consumer API | http://localhost:8197 |
| Kafdrop | http://localhost:19000 |
| Kafka broker | localhost:9092 |

---

## Case 01 — Basic message

| Field | Value |
|-------|-------|
| Method | `POST` |
| URL | `http://localhost:8097/casos/01-basico` |
| Content-Type | `text/plain` |
| Topic | `str-topic` |
| Response | `201 Created` |

```bash
curl -X POST http://localhost:8097/casos/01-basico \
  -H "Content-Type: text/plain" \
  -d "Hola Kafka"
```

**Verify:** Producer log `[CASO-01] Particion X, Offset Y`; consumer logs `[CASO-01] LISTENER1/2/3`.

---

## Case 02 — Message key (partition affinity)

| Field | Value |
|-------|-------|
| URL | `http://localhost:8097/casos/02-con-key` |
| Content-Type | `application/json` |
| Topic | `order-topic` (3 partitions) |
| Key | `orderId` |

```bash
curl -X POST http://localhost:8097/casos/02-con-key \
  -H "Content-Type: application/json" \
  -d "{\"orderId\":\"ORD-001\",\"product\":\"Laptop\",\"quantity\":1}"

curl -X POST http://localhost:8097/casos/02-con-key \
  -H "Content-Type: application/json" \
  -d "{\"orderId\":\"ORD-001\",\"product\":\"Mouse\",\"quantity\":2}"
```

**Verify:** Same `orderId` → same partition; consumer log `[CASO-02] Orden ORD-001 (key=ORD-001) -> particion X`.

---

## Case 03 — Typed JSON event

| Field | Value |
|-------|-------|
| URL | `http://localhost:8097/casos/03-evento-json` |
| Topic | `user-event-topic` |
| Key | `userId` |

```bash
curl -X POST http://localhost:8097/casos/03-evento-json \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"user-42\",\"action\":\"LOGIN\"}"
```

**Verify:** Consumer log `[CASO-03] Usuario user-42 ejecuto 'LOGIN' en ...`

---

## Case 04 — Payment + retry + DLT

| Field | Value |
|-------|-------|
| URL | `http://localhost:8097/casos/04-pago` |
| Topic | `payment-topic` |

**Valid payment:**

```bash
curl -X POST http://localhost:8097/casos/04-pago \
  -H "Content-Type: application/json" \
  -d "{\"paymentId\":\"PAY-001\",\"userId\":\"user-1\",\"amount\":99.99}"
```

**Invalid payment (→ DLT after retries):**

```bash
curl -X POST http://localhost:8097/casos/04-pago \
  -H "Content-Type: application/json" \
  -d "{\"paymentId\":\"PAY-002\",\"userId\":\"user-2\",\"amount\":-50.0}"
```

| Scenario | Expected consumer log |
|----------|----------------------|
| amount > 0 | `[CASO-04] Pago PAY-001 procesado exitosamente` |
| amount ≤ 0 | 3 retries → `[CASO-04] DLT >>> Pago PAY-002 rechazado` |

**Verify in Kafdrop:** topics `payment-topic-retry-*` and `payment-topic-dlt`.

---

## Case 05 — Request-reply

| Field | Value |
|-------|-------|
| URL | `http://localhost:8097/casos/05-request-reply` |
| Topics | `request-topic` → `reply-topic` |
| Response | `200 OK` with body |

```bash
curl -X POST http://localhost:8097/casos/05-request-reply \
  -H "Content-Type: text/plain" \
  -d "Hola desde cURL"
```

**Expected response:**

```text
Echo: Hola desde cURL
```

---

## Case 06 — Text filter (RecordInterceptor)

| Field | Value |
|-------|-------|
| URL | `http://localhost:8097/casos/06-texto-filtro` |
| Topic | `text-filter-topic` |

```bash
curl -X POST http://localhost:8097/casos/06-texto-filtro \
  -H "Content-Type: text/plain" \
  -d "Hola Mundo!  Niño café"
```

**Verify:** Consumer tabulated analysis `[CASO-06] ========== ANALISIS TABULADO ==========`; double spaces → tabs via interceptor.

---

## Case 07 — Inventory + database

**POST movements (producer):**

```bash
curl -X POST http://localhost:8097/casos/07-inventario \
  -H "Content-Type: application/json" \
  -d '{"productId":"PROD-001","productName":"Laptop Dell","quantity":10,"operation":"STOCK_IN"}'

curl -X POST http://localhost:8097/casos/07-inventario \
  -H "Content-Type: application/json" \
  -d '{"productId":"PROD-001","productName":"Laptop Dell","quantity":3,"operation":"STOCK_OUT"}'
```

**GET queries (consumer — exception: read API on 8197):**

```bash
curl http://localhost:8197/casos/07-inventario
curl http://localhost:8197/casos/07-inventario/resumen
curl http://localhost:8197/casos/07-inventario/PROD-001
```

**Database:** SQLite at `str-consumer/data/kafka-lab.db`, table `inventory_records`.

---

## Case 08 — Kafka Streams (08a / 08b / 08c)

> Start **one** Streams app first: `run-streams-pipe.bat`, `run-streams-linesplit.bat`, or `run-streams-wordcount.bat`. Consumer (8197) not required.

### 08a — Pipe

```bash
curl -X POST http://localhost:8097/casos/08a-pipe \
  -H "Content-Type: text/plain" \
  -d "Hola Kafka Streams"
```

**Verify:** `streams-pipe-output` in Kafdrop; topology log in Pipe console.

### 08b — LineSplit

```bash
curl -X POST http://localhost:8097/casos/08b-linesplit \
  -H "Content-Type: text/plain" \
  -d "Hola Kafka Streams"
```

**Verify:** individual words in `streams-linesplit-output`.

### 08c — WordCount

```bash
curl -X POST http://localhost:8097/casos/08c-wordcount \
  -H "Content-Type: text/plain" \
  -d "hello kafka streams hello"
```

**Verify:** word counts in `streams-wordcount-output`; state store `counts-store` in topology log.

See [full Streams walkthrough](/kafka/apache-kafka-streams-pipe-linesplit-wordcount/).

---

## Recommended test sequence

```bash
curl -X POST http://localhost:8097/casos/01-basico -H "Content-Type: text/plain" -d "Hola Kafka"
curl -X POST http://localhost:8097/casos/02-con-key -H "Content-Type: application/json" -d "{\"orderId\":\"ORD-001\",\"product\":\"Laptop\",\"quantity\":1}"
curl -X POST http://localhost:8097/casos/03-evento-json -H "Content-Type: application/json" -d "{\"userId\":\"user-42\",\"action\":\"LOGIN\"}"
curl -X POST http://localhost:8097/casos/04-pago -H "Content-Type: application/json" -d "{\"paymentId\":\"PAY-001\",\"userId\":\"user-1\",\"amount\":99.99}"
curl -X POST http://localhost:8097/casos/05-request-reply -H "Content-Type: text/plain" -d "Hola Kafka"
curl -X POST http://localhost:8097/casos/06-texto-filtro -H "Content-Type: text/plain" -d "Hola Mundo!  Niño café"
curl -X POST http://localhost:8097/casos/07-inventario -H "Content-Type: application/json" -d "{\"productId\":\"PROD-001\",\"productName\":\"Laptop Dell\",\"quantity\":10,\"operation\":\"STOCK_IN\"}"
curl http://localhost:8197/casos/07-inventario/resumen
```

## Windows (PowerShell)

From the lab repo: `.\demo.ps1`

## Postman

Import from lab repo:

- `postman/Kafka-Curso.postman_collection.json`
- `postman/Kafka-Curso.postman_environment.json` (`baseUrl` = `http://localhost:8097`)

## Checklist

- [ ] Case 01 → `201`
- [ ] Case 02 → same key, same partition
- [ ] Case 03 → consumer action log
- [ ] Case 04 valid → success log
- [ ] Case 04 invalid → DLT after ~6s
- [ ] Case 05 → `Echo: ...` in HTTP response
- [ ] Case 06 → tabulated analysis in consumer
- [ ] Case 07 → POST + GET resumen + `.db` file exists
- [ ] Case 08c → WordCount in `streams-wordcount-output`
- [ ] Kafdrop shows all topics

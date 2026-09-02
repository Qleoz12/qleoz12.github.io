var store = [{
        "title": "iftt proof",
        "excerpt":"this post its  a proof for test automatization for links post with social media  nets througth iftt   reference https://eduardoboucas.com/blog/2015/04/28/sharing-jekyll-posts-on-social-media-using-front-matter-and-ifttt.html  ","categories": ["blog"],
        "tags": ["jekyll","social","example","post"],
        "url": "/blog/example-multi-social/",
        "teaser": null
      },{
        "title": "Dividend Yield vs Drawdown: a simple approach to compare stocks",
        "excerpt":"Motivation The aim of this analysis is to answer a very simple question: How would you compare high-dividend stocks without ignoring the real risk I’m taking? Many times, we focus only on dividend yield, while we ignore something equally important: 📉 how deep a stock can fall before recovering. Instead...","categories": ["investing","dividends","data-analysis"],
        "tags": ["dividends","drawdown","python","pandas","stocks"],
        "url": "/investing/dividends/data-analysis/basic-comparisson-markets/",
        "teaser": null
      },{
        "title": "Apache Kafka — Concepts I Learned",
        "excerpt":"Notes from my str-producer / str-consumer Spring Boot lab: HTTP ingress on port 8097, Kafka on 9092, consumer on 8197, Kafdrop on 19000. Broker Definition: A Kafka server that stores topics, serves producers and consumers, and coordinates partitions. Why it matters: Brokers are the runtime of Kafka; clustering them gives...","categories": ["Learning","Backend","Kafka"],
        "tags": [],
        "url": "/kafka/apache-kafka-concepts-i-learned/",
        "teaser": null
      },{
        "title": "Apache Kafka Lab — Architecture",
        "excerpt":"Architecture of my str-producer / str-consumer Spring Boot laboratory. Components and ports Service Port Role str-producer 8097 REST ingress → Kafka Kafka broker 9092 Message log str-consumer 8197 Kafka → processing (@KafkaListener) str-streams — Kafka Streams topologies (Case 08) Kafdrop 19000 Web UI to inspect topics Normal flow (Cases 01–07)...","categories": ["Learning","Backend","Kafka","Architecture"],
        "tags": [],
        "url": "/kafka/apache-kafka-lab-architecture/",
        "teaser": null
      },{
        "title": "Apache Kafka Lab — Try It Yourself (cURL)",
        "excerpt":"Hands-on curls for my str-producer / str-consumer lab. Source: curso-apache-kafka-master/POSTMAN-CURL.md (local study repo). Before you start: docker-compose up -d (Kafka + Kafdrop) Start str-consumer (port 8197) Start str-producer (port 8097) Open Kafdrop: http://localhost:19000 HTTP requests go to the producer (8097). The consumer (8197) reads from Kafka — it does not...","categories": ["Learning","Backend","Kafka","Labs"],
        "tags": [],
        "url": "/kafka/kafka-lab-try-it-yourself/",
        "teaser": null
      },{
        "title": "Apache Kafka Streams — Pipe, LineSplit, WordCount",
        "excerpt":"Case 08 in my lab, aligned with the official Kafka Streams tutorial. Module: str-streams/ (plain Java, KafkaStreams + main() — not Spring Boot). Spring Kafka vs Kafka Streams   Casos 01–07 Caso 08 API KafkaTemplate, @KafkaListener StreamsBuilder, KStream, KTable Model Message in → handler Topology of processors Runtime str-consumer :8197...","categories": ["Learning","Backend","Kafka","Labs"],
        "tags": [],
        "url": "/kafka/apache-kafka-streams-pipe-linesplit-wordcount/",
        "teaser": null
      }]

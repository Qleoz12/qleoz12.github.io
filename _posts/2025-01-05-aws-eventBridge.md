---
title: "AWS EventBridge"
search: false
categories: 
  - AWS
date: 2025-01-05
last_modified_at: 2025-01-05T08:06:00-05:00
share: linkedin
---

## Introduction
This post is a hub of AWS EventBridge notes.

AWS EventBridge is a serverless event bus service that makes it easy to connect applications using data from your own applications, integrated Software-as-a-Service (SaaS) applications, and AWS services.

### Key Features:

- **Event-driven architecture:** Simplifies the process of building event-driven applications.
- **Serverless:** Automatically scales and handles infrastructure management.
- **Integrated with AWS services:** Easily connects with other AWS services like Lambda, SQS, SNS, and more.
- **Custom event buses:** Create custom event buses for your applications.
- **Schema registry:** Automatically discovers and stores event schemas.

### Example Use:
#### Microservices Synchronization
Case: Update the status of orders across different microservices.

Event: An order changes to "Shipped" in the inventory system.

Action: EventBridge distributes the event to logistics and billing services to initiate shipping and generate the invoice.

sample event
```json
{
  "source": ["app.orders"],
  "detail-type": ["Order Shipped"],
  "detail": {
    "orderId": "12345",
    "status": "Shipped"
  }
}
```

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/aws/DALL·E 2025-01-05 18.04.16 - sample Amazon EventBridge. The diagram highlights three components in red_ Inventory .webp)


## References
- https://media.datacumulus.com/aws-dva/AWS%20Certified%20Developer%20Slides%20v37.pdf
- https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/?couponCode=NEWYEARCAREER
- https://www.stephanemaarek.com/
- https://docs.aws.amazon.com/
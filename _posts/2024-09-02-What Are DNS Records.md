---
title:  "What Are DNS Records?"
search: false
categories: 
  - Web/hosting
date: 2024-09-19
last_modified_at: 2024-09-19T08:06:00-05:00
share: linkedin
---

## Introduction


DNS Zone Editor.

##  A Record
maps a hostname to ipv4
AAAA Record
maps a hostname to ipv6

##  CNAME
maps a hostmname to another hostname

## Alias records 
maps a hostnamew to ase resource 
An extension to DNS functioanlity 
alies recors not use ttl
alias record targets: 
- elastic load balancer
- amzaon cloudfront distribution
- amazon api gateway
- elastic beanstalk
- s3 website bucket
- vpc interface endpoint
- global accelerator
- route 53 record in the same hosted zone 


MX Entry
TXT Record
SRV Record

DNS Glossary
Additional Information

## TTL
Each DNS record has a TTL (Time To Live) which orders clients for how long to cache these values and not overload the DNS Resolver with DNS requests. The TTL value should be set to strike a balance between how long the value should be cached vs. how many requests should go to the DNS Resolver.

## Conclusion:
- pending

## References

- [The Top 10 Content Delivery Networks (CDNs)](https://www.bluehost.com/help/article/dns-records-explained)

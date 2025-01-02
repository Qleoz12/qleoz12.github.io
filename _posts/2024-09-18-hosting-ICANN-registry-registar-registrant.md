---
title:  "ICANN Registry, Registrar, and Registrant: What's the Difference?"
search: false
categories: 
  - Web/hosting
date: 2024-09-02
last_modified_at: 2024-09-02T08:06:00-05:00
share: linkedin
---

## Introduction

When it comes to domain names and the internet, you might have come across terms like ICANN, 
registry, registrar, and registrant. Understanding the roles and differences between 
these entities is crucial for anyone involved in managing or purchasing domain names. 
This post aims to clarify these terms and explain their functions.

### ICANN

The Internet Corporation for Assigned Names and Numbers (ICANN) is a global organization 
responsible for coordinating the maintenance and procedures of several databases 
related to the namespaces of the internet. Essentially, ICANN ensures the stable and 
secure operation of the internet's unique identifier systems.

### Registry

A registry is an organization that manages top-level domains (TLDs) such as `.com` and `.net`. 
The registry maintains the database of all domain names registered under its TLD and ensures 
that each domain name is unique. The Internet Assigned Numbers Authority (IANA), a department within ICANN, oversees these registries.

Registries delegate the commercial sales of domain name registrations to registrars. 
For instance, when a registrar sells a `.com` domain registration to an end user (or 'registrant'), 
the registrar must notify VeriSign, the registry for `.com` domains. 
The registrar also pays a fee to VeriSign, which is included in the price charged to the end user.

### Registrar

A registrar is a company authorized by ICANN to sell domain names to the public. 
Registrars provide the interface and services necessary for individuals and organizations to register domain names. 
They act as intermediaries between the registrants and the registries. Examples of popular registrars include GoDaddy, Namecheap, and Google Domains.

### Registrant

A registrant is the individual or organization that registers a domain name. 
The registrant holds the rights to use the domain name for a specified period, typically one year, with the option to renew. 
The registrant is responsible for providing accurate contact information and ensuring that the domain name is used in compliance with the terms set by the registrar and registry.


### Name Servers

At the domain registrar, every domain must specify two pieces of information called name servers. 
Name servers are crucial because they tell everyone where to look for the DNS records of the domain.
Essentially, name servers act as directories that guide internet traffic to the correct location.

Here are some examples of name servers:
- `dns1.name-services.com` = BulkRegister
- `ns26.domaincontrol.com` = GoDaddy
- `ns.rackspace.com` = Rackspace
- `dns1.stabletransit.com` = Mosso / Rackspace Cloud

### DNS – Domain Name Services

DNS (Domain Name System) is the backbone of every domain. It translates human-readable domain 
names (like www.example.com) into IP addresses that computers use to identify each other on the network. DNS has three main components:

1. **HOST A Record**: This record maps a domain to a specific IP address. It is used to point a domain or subdomain to a web server.
   - Examples:
     - `www.paperstreet.com` → `72.32.8.45`
     - `paperstreet.com` → `72.32.8.45`
     - `mail.paperstreet.com` → `72.3.161.129`
   - HOST A records allow for multiple subdomains, such as `citrix.paperstreet.com`, `webmail.paperstreet.com`, or `essentials.paperstreet.com`.

2. **MX Record (Mail Exchange)**: These records specify the mail servers responsible for receiving email on behalf of a domain. They direct email traffic to the correct mail server.
   - Example:
     - `paperstreet.com` email points to `mail.paperstreet.com`

3. **CNAME Record (Canonical Name)**: This is an alias for another domain name. Instead of pointing directly to an IP address, a CNAME points to another domain name, which then points to an IP address. This is useful for managing multiple domain names that should resolve to the same IP address.
   - Example:
     - `www.paperstreet.com` → `paperstreet.com`
   - This setup allows the `www` version of `paperstreet.com` to point to `paperstreet.com` and use the same IP address.

By understanding these components, you can effectively manage your domain's DNS settings to ensure proper functionality and accessibility.


## Conclusion:
- pending

## References

- [The Top 10 Content Delivery Networks (CDNs)](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name-registrar/)
- https://www.paperstreet.com/blog/domains-registrars-name-servers-and-dns-oh-my/
https://help.one.com/hc/en-us/articles/115005588149-What-is-a-registry-registrar-and-registrant
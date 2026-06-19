---
title:  "tools, commands and hacks"
search: false
categories: 
  - Tools
date: 2024-12-02
last_modified_at: 2024-12-02T08:06:00-05:00
share: linkedin
---

## Introduction
this post is a hub of tools usufull for daily use. as a systems engieener

# dig command
```bash 
dig simple.stephane-klein.info
```

Description
The dig (domain information groper) command is a flexible tool for interrogating DNS name servers. It performs DNS lookups and displays the answers that are returned from the queried name servers. Most DNS administrators use the dig command to troubleshoot DNS problems because of its flexibility, ease of use, and clarity of output. Although dig is normally used with command-line arguments, it also has a batch mode for reading lookup requests from a file. Unlike earlier versions, the BIND9 implementation of dig allows multiple lookups to be issued from the command line. Unless it is told to query a specific name server, the dig command tries each of the servers listed in the /etc/resolv.conf file. If no usable server addresses are found, the dig command sends the query to the local host. If you specify no command line arguments or options, the dig command performs an NS query for "." (the root).


## References

- pending
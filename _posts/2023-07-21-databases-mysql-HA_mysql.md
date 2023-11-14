---
title:  "Mysql HA- high Availibity"
search: false
categories: 
  - devops/mysql/HA
date: 2023-07-21
last_modified_at: 2023-07-21T08:06:00-05:00
share: linkedin
---

# Mysql HA

mysql had capabilities, that allow us to create a componentes for get high availability 
of our database, to achieve that we have this kind of tools, when we are using 

- [mysql group replication](https://dev.mysql.com/doc/refman/8.0/en/group-replication.html)
- [mysql innoDB Cluster](https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html)
- [mysql NDB Cluster](https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html)

for this entry, I will expose you how use innoDB for create a failure tolerant database componenet

## Concepts

### high availibity 
High availability refers to the ability of a system to remain accessible and 
operational for an extended period, without any significant downtime or service 
interruptions. In the context of databases like MySQL, achieving high availability 
ensures that the database remains accessible even in the face of hardware failures,
 software issues, or maintenance activities. High availability is essential for 
 critical applications where downtime can result in financial losses, decreased 
 user satisfaction, and other negative consequences.


### scaling features 
Scaling features in the context of MySQL InnoDB refer to the ability of the database to handle increased workloads and data without sacrificing performance. There are two primary types of scaling:

**Vertical Scaling (Scaling Up):** This involves upgrading the hardware resources of the server hosting the MySQL database, such as increasing CPU power, RAM, or storage capacity. While vertical scaling can provide a performance boost, it has limitations and may eventually become expensive or impractical when reaching the hardware's maximum capabilities.

**Horizontal Scaling (Scaling Out):** This involves distributing the database load across multiple servers. With horizontal scaling, you can add more servers to handle the increased workload and data. It provides better scalability compared to vertical scaling since you can keep adding servers as needed. However, horizontal scaling also introduces complexities related to data distribution and synchronization.

To achieve high availability and scaling features with MySQL InnoDB, several strategies and technologies can be used:

**Replication:** MySQL supports replication, where one server (the master) is designated as the primary source of data changes, and one or more servers (the replicas) replicate the changes from the master. This provides improved read scalability and some degree of high availability since the replicas can be used for read-heavy workloads or failover scenarios.

**Load Balancing:** For horizontally scaled setups, a load balancer can distribute incoming database requests across multiple database servers. This helps evenly distribute the workload and prevent individual servers from becoming overwhelmed.

**Clustering:** MySQL can be deployed in a clustered setup, such as MySQL Cluster or Galera Cluster. These technologies enable synchronous replication and automatic failover, enhancing both high availability and read/write scalability.

**Sharding:** Sharding involves partitioning the database into smaller, independent parts called shards. Each shard is hosted on a separate server. Sharding can improve write scalability, but it introduces complexity in managing data distribution and joins across shards.

## Mysql InnoDB
InnoDB is a transactional storage engine for MySQL, developed by Innobase Oy,
which was later acquired by Oracle Corporation. It is designed to provide 
high-performance and reliability for both read and write-intensive workloads. 
InnoDB supports ACID (Atomicity, Consistency, Isolation, Durability) properties, 
making it suitable for applications that require data integrity and consistency.

An InnoDB Cluster consists of at least three MySQL Server instances, 
and it provides high-availability and scaling features. 
InnoDB Cluster uses the following MySQL technologies:

- MySQL Shell, which is an advanced client and code editor for MySQL.
- MySQL Server, and Group Replication, which enables a set of MySQL instances to provide high-availability. InnoDB Cluster provides an alternative, easy to use programmatic way to work with Group Replication.
- MySQL Router, a lightweight middleware that provides transparent routing between your application and InnoDB Cluster.

## let's try it out:
all the process its based at the article https://diptochakrabarty.medium.com/setting-mysql-cluster-using-docker-f0e405d03762
I create a repo using docker containers for easily handle several instances and join them at a innoDB cluster, 
docker with docker compose deploy the nodes with a simple 
```docker
docker compose up -d
```
when all the nodes stay up we can confiogure the cluster, we need get into a mysql shell for create the cluster
```docker
docker exec -it mysql-docker-cluster_mysql-dev1_1 mysqlsh -uclusteradmin -pcladmin (shell for mysql-dev1 container)
```
when we are  inside fomr this node we will configure all another nodes
```docker
dba.configureInstance("clusteradmin@mysql-dev1:3306")
dba.configureInstance("clusteradmin@mysql-dev2:3306")
dba.configureInstance("clusteradmin@mysql-dev3:3306")
dba.configureInstance("clusteradmin@mysql-dev4:3306")
```
## Downsides:

While BFS is a simple and efficient algorithm for exploring large graphs or trees,
 it does have some downsides:

Space Complexity: BFS uses a queue to keep track of the nodes that need to be 
visited, which can take up a lot of memory for large graphs or trees.

Suboptimal Paths: BFS is designed to find the shortest path between two nodes, 
but it may not always find the optimal path in a weighted graph. This is 
because BFS does not take edge weights into account when determining the order 
in which to visit nodes.

Time Complexity for Dense Graphs: In dense graphs with a large number of edges, 
BFS can have a high time complexity, as it may visit many unnecessary nodes 
before finding the desired path.

Despite these downsides, BFS is still a widely used algorithm in computer 
science due to its simplicity and versatility.

## Conclusion:

Breadth-First Search is a simple but powerful algorithm that can be used to 
traverse a graph or tree in a systematic way. It's a good choice for finding 
the shortest path between two nodes or for exploring a graph or tree in a 
breadth-first manner. By visiting nodes at a fixed distance from the starting 
node before moving on to nodes that are farther away, BFS ensures that you visit 
all the nodes in a graph or tree efficiently.

I hope you found this introduction to BFS helpful. If you have any questions or 
comments, feel free to leave them below!

## References
- https://medium.com/@wagnerjfr/setting-up-mysql-group-replication-with-mysql-docker-images-f5eedd44fa2b
- https://dev.mysql.com/blog-archive/setting-up-mysql-group-replication-with-mysql-docker-images/
- https://pierreabreu.medium.com/how-to-create-master-slave-mysql-8-with-docker-compose-yml-c137f45e28c7
- https://dev.mysql.com/doc/refman/5.7/en/mysql-innodb-cluster-introduction.html
- https://diptochakrabarty.medium.com/setting-mysql-cluster-using-docker-f0e405d03762
- https://github.com/DiptoChakrabarty?page=5&tab=repositories
- https://github.com/DiptoChakrabarty/CodingInterviews/tree/master/VISA%20Senior%20Software%20Engineer%202019
- https://blog.byte.builders/post/deploy-and-manage-mysql-innodb-cluster-in-aws/
- https://dev.mysql.com/blog-archive/docker-compose-setup-for-innodb-cluster/
- https://poazy.github.io/20210712-mysql-innodb-cluster_install-1m2s.html
- https://www.dbi-services.com/blog/installing-mysql-innodb-cluster-in-oke-using-a-mysql-operator/
- https://git.g-able.com/users/006763/projects
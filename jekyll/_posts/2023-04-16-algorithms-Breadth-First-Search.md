---
title:  "Algorithm Breadth-First Search"
search: false
categories: 
  - Fundamentals/algorithm
date: 2023-04-16
last_modified_at: 2022-04-25T08:06:00-05:00
---

# Breadth-First Search: A Simple but Powerful Graph Traversal Algorithm

When working with graphs or trees, one of the most basic operations you may need 
to perform is searching for a specific node or path. Breadth-First Search (BFS) 
is a simple but powerful algorithm that allows you to traverse a graph or tree 
in a systematic way, visiting each node at a fixed distance from the starting 
node before moving on to nodes that are farther away. In this post, we'll 
explore what BFS is, how it works, and why it's important.

## Introduction:

Breadth-First Search is a graph traversal algorithm that visits all the nodes 
at a fixed distance from the starting node before visiting nodes that are 
farther away. This makes it a good choice for finding the shortest 
path between two nodes or for exploring a graph or tree in a systematic way.

## How BFS Works:

The basic idea behind BFS is to visit all the nodes at a given distance 
from the starting node before moving on to nodes that are farther away. 
To do this, BFS uses a queue data structure to keep track of the nodes 
that need to be visited. Here's how the algorithm works:

Enqueue the starting node in the queue.
While the queue is not empty, dequeue the first node in the queue and mark it as visited.
Enqueue all the neighbors of the dequeued node that have not been visited yet.
Repeat steps 2-3 until the queue is empty.
By visiting nodes in this way, BFS ensures that you visit all the nodes at a 
given distance from the starting node before moving on to nodes that are farther
 away. This makes it an efficient algorithm for exploring large graphs or trees.

## Why BFS is Important:

BFS is an important algorithm in computer science because it can be used to 
solve a wide range of problems, from finding the shortest path between two nodes 
to detecting cycles in a graph. It's also a fundamental building block for more 
complex algorithms, such as Dijkstra's algorithm for finding the shortest path 
in a weighted graph.

### Example Implementation in Java:

Here's an example implementation of BFS in Java:


```java
import java.util.LinkedList;
import java.util.Queue;

public class BreadthFirstSearch {
    public static void bfs(int[][] graph, int start) {
        boolean[] visited = new boolean[graph.length];
        Queue<Integer> queue = new LinkedList<Integer>();
        
        visited[start] = true;
        queue.add(start);
        
        while (!queue.isEmpty()) {
            int node = queue.remove();
            System.out.print(node + " ");
            
            for (int i = 0; i < graph[node].length; i++) {
                if (graph[node][i] == 1 && !visited[i]) {
                    visited[i] = true;
                    queue.add(i);
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[][] graph = {
            {0, 1, 0, 1, 0},
            {1, 0, 1, 0, 1},
            {0, 1, 0, 1, 0},
            {1, 0, 1, 0, 1},
            {0, 1, 0, 1, 0}
        };
        
        System.out.println("BFS traversal starting from node 0:");
        bfs(graph, 0);
    }
}
```

This code represents a graph as an adjacency matrix and performs a BFS traversal 
starting from node 0. In each iteration of the while loop, the first node in the
queue is dequeued, and all its unvisited neighbors are added to the queue. 
The visited array keeps track of which nodes have been visited, 
so that each node is visited exactly once.

## Time Complexity:

The time complexity of BFS is O(V+E), where V is the number of vertices and E 
is the number of edges in the graph. This is because BFS traverses all the 
vertices and edges in the graph once. In the worst case, where the graph is a 
complete graph, BFS will visit every vertex and edge exactly once, resulting in 
a time complexity of O(V^2).

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
- Balazs, H. (no date) Artificial Intelligence I: Meta-heuristics and games in 
  Java, Udemy. Udemy. Available at: 
  https://www.udemy.com/course/artificial-intelligence-games-in-java/ (Accessed: April 16, 2023).

- https://stackoverflow.com/questions/5357211/breadth-first-search-query-in-mysql 
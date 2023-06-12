---
title:  "Deterministic Finite Automata (DFAs)"
search: false
categories: 
  - Fundamentals/algorithm
date: 2023-04-16
last_modified_at: 2022-04-25T08:06:00-05:00
w_github_card:
  - input: "Algorithms"
    link: "https://github.com/Qleoz12/JavaKnowledge/tree/master/algoritms"

feature_row2:
- image_path: https://img.asmedia.epimg.net/resizer/6Y-eMP_PRbjQvkQuWS86T_FG61U=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/PVMMQEWO7VOXNKKE7GPPYWTE2Y.jpg
  excerpt: 'This is some sample java maven project  with a package for FDA proofs'
  title: "Algorithms DFA"
  url: "https://github.com/Qleoz12/JavaKnowledge/tree/master/algoritms"
  btn_label: "repository"
  btn_class: "btn--inverse"

---


A deterministic finite automaton (DFA) is a mathematical model used to recognize 
patterns in strings. It is a type of finite state machine that accepts or rejects 
a given string based on its current state and the input it receives.

## Formal definition
A DFA is defined as a 5-tuple, consisting of:

A finite set of states Q \
A finite set of input symbols Σ (also called the alphabet) \
A transition function δ : Q × Σ → Q, which maps a state and an input symbol to a new state \
A start state q<sub>0</sub> ∈ Q \
A set of accept states F ⊆ Q

## How DFAs work
A DFA starts in the start state and reads a string of input symbols. 
For each symbol, it transitions to a new state based on the current state and the symbol. 
If the final state is an accept state, the string is accepted; otherwise, it is rejected.

## Example
Let's consider a DFA that recognizes strings of 0's and 1's that have an odd 
number of 1's. The DFA has two states: q<sub>0</sub> and q<sub>1</sub>. 
The transition function is defined as follows:

δ(q<sub>0</sub>, 0) = q<sub>0</sub>
δ(q<sub>0</sub>, 1) = q<sub>1</sub>
δ(q<sub>1</sub>, 0) = q<sub>1</sub>
δ(q<sub>1</sub>, 1) = q<sub>0</sub>
The start state is q<sub>0</sub> and the accept state is q<sub>1</sub>.

Let's see how the DFA processes the string "11010":

q0 --(1)--> q1 --(1)--> q0 --(0)--> q0 --(1)--> q1 --(0)--> q1
The final state is q<sub>1</sub>, which is an accept state. 
Therefore, the string "11010" is accepted by the DFA.

## slides 
<div class="responsive-wrap">
<!-- this is the embed code provided by Google -->
  <iframe src="https://docs.google.com/presentation/d/18b_TQyfrvZu2krvv_HYpQvWRHYA1fD9iiwvB9uBcJuI/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
<!-- Google embed ends -->
</div>

## Conclusion:

DFAs are a powerful tool for recognizing patterns in strings. 
They can be used in a wide range of applications, such as lexical analysis,
regular expression matching, and compiler design. Understanding DFAs is an 
important part of computer science and is essential for building robust 
software systems.

## Repository 
{% include feature_row id="feature_row2" type="left" %}


## References
<p>
* https://ivanvladimir.gitlab.io/lfya_book/docs/02lam%C3%A1quinasinmemoria/04aut%C3%B3matafinito/
* https://colab.research.google.com/github/ivanvladimir/maquinas_notebooks/blob/main/lfya/02%20La%20m%C3%A1quina%20sin%20memoria.ipynb
</p>
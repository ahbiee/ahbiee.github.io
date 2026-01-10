---
title: Trie 字典樹(前綴樹) 學習筆記
mathjax: true
tags:
  - Competitive Programming
  - 學習筆記
categories:
  - 學習筆記
  - Competitive Programming
date: 2026-01-10 21:29:55
description: Trie 學習筆記
---
 
<!-- more -->

[學習影片：Bilibili左程云【算法讲解044【必备】前缀树原理和代码详解】](https://www.bilibili.com/video/BV1Yu4y1Q7vR/?share_source=copy_web&vd_source=e8bddcf402e9a66b9137df8d79f50934)
[學習影片：Bilibili左程云【算法讲解045【必备】前缀树的相关题目】 ](https://www.bilibili.com/video/BV16h4y1K7Sp/?share_source=copy_web&vd_source=e8bddcf402e9a66b9137df8d79f50934)
[學習影片：Bilibili左程云【算法讲解046【必备】构建前缀信息的技巧-解决子数组相关问题】](https://www.bilibili.com/video/BV1Sj411q7fi/?share_source=copy_web&vd_source=e8bddcf402e9a66b9137df8d79f50934)

# 概述
字典樹是一個類似於hash table的樹結構，但有著更方便的查找功能，也可以
- 查詢特定字串的出現次數
- 查詢以某某字串為開頭的次數

# 方法概要與原理
我們依次輸入，每個字串都從根節點(頭節點, root)開始，依序將每一個字串插入到 **樹** 結構中，找到就往該節點走，找不到就新增，每一個節點：
1. 代表一個特定字元(char)，依照字串順序插入
2. 有一個int p，代表該節點被passed多少次，只要節點被經過就+1
3. 有一個int e，代表有幾個字串end在這個節點，字串以該節點做 結尾就+1

- 優點
  - 方便查找任意形式的字串
  - 查詢速度快 O(strlen)
- 缺點
  - 浪費空間

# 基礎版code
1. void init() 初始化
2. void insert(string word) 將字串插入樹中
3. int search(string word) 回傳符合 word 的個數 (也就是看p)
4. int prefixNumber(string prefix) 回傳前綴為 prefix 的個數 (也就是看e)
5. void erase(string word) 將 word 從樹中移除

使用靜態陣列實現
```cpp
int tree[MAXN][size] = {};
int passed[MAXN] = {};
int stop[MAXN] = {};
// 以上陣列的0位子都是不用的
int cnt = 1;

void init(){
  for(int i=1; i<=cnt; ++i){
    for(int j=0; j<size; ++j) tree[i][j] = 0;
    passed[i] = 0;
    stop[i] = 0;
  }
  cnt = 1;
}

void insert(string word){
  int curr = 1;
  ++passed[curr]; // 經過點，++passed
  for(int i=0, path; i<word.length(); ++i){
    path = word.at(i) - 'a'; // 求出下一個位置的index
    if(tree[curr][path] == 0) tree[curr][path] = ++cnt; // 如果當前位置走到目標位置不存在，就用++cnt的值
    curr = tree[curr][path]; // 繼續往下走
    ++passed[curr]; // 記得經過就要++passed
  }
  ++stop[curr]; // 最後停住的地方要++stop
}

int search(string word){
  int curr = 1;
  for(int i=0, path; i<word.length(); ++i){
    path = word.at(i) - 'a';
    if(tree[curr][path] == 0) return 0; // 如果從curr往path的路徑不存在，代表搜尋的word不存在
    curr = tree[curr][path]; // 否則繼續往下走
  }
  return stop[curr]; // 最後回傳在curr位置停下(stop)的次數
}

int prefixNumber(string word){
  int curr = 1;
  for(int i=0, path; i<word.length(); ++i){
    path = word.at(i) - 'a';
    if(tree[curr][path] == 0) return 0;
    curr = tree[curr][path];
  }
  return passed[curr]; // 和search方法一模一樣，只是回傳的對象變成passed
}

void erase(string word){
  if(search(word) == 0) return; // 如果找不到字就不管他
  int curr = 1;
  --passed[curr];
  for(int i=0, path; i<word.length(); ++i){
    path = word.at(i) - 'a';
    if(--passed[tree[curr][path]] == 0){ // 如果curr往path的路徑上，p值為1，代表後面的東西都不需要了
      tree[curr][path] = 0; // 將curr不再連通path，直接捨棄後面所有的東西(因為都會被減成p==0)
      return;
    }
    curr = tree[curr][path]; // 否則繼續往下走，注意後面不需要再--passed[curr]，因為在if區塊我們已經操作完了
  }
  --stop[curr]; // 最後--stop[curr]
}

```

# 練習題目與題解

[牛客NewCoder 字典树的实现](/posts/NewCoder/trieTemplate)
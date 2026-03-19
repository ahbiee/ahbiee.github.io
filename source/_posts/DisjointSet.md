---
title: DisjointSet 並查集 學習筆記
mathjax: true
tags:
  - Competitive Programming
  - 學習筆記
  - DisjointSet
categories:
  - 學習筆記
  - Competitive Programming
date: 2026-03-18 13:29:16
---

<!-- more -->
[學習影片：Bilibili左程云【算法讲解056【必备】并查集-上】](https://www.bilibili.com/video/BV1894y1W7Sb/?share_source=copy_web&vd_source=e8bddcf402e9a66b9137df8d79f50934)

# 概述
解決集合、快速合併的問題
各種操作所花費的時間，均攤後時間複雜度幾乎為O(1)

# 方法概要與原理
1. int find(a) 找出a所在的集合中的代表
2. bool isSameSet(a, b) 回傳a, b是否屬於同個集合
3. void union(a, b) 將a所在的集合的所有元素與b所在的集合的所有元素合併，變成一個新的集合

兩個陣列:
father[]: f\[i] 所對應的就是 index 的 father，初始每個i對應的都是自己 f\[i] = i
size[]: size\[i] 所在的集合的大小，用於union的優化

優化:
* 必須: 扁平化(路徑壓縮) -> find
* 可選: 小掛大 -> union

# 基礎版code
```cpp
int n; // target n
vector<int> f(MAXN);

void build(){
  for(int i=0; i<n; ++i){
    f[i] = i;
  }
}

int find(int a){
  return ((f[a] == a) ? a : (f[a] = find(f[a])));
}

bool isSameSet(int a, int b){
  return find(a) == find(b);
}

void Union(int a, int b){
  int fa = find(a);
  int fb = find(b);
  if(fa != fb){ // 是同一個集合就不用union
    // 小掛大優化
    if(size[fa] >= size[fb]){ // fb 掛 fa
      size[fa] += size[fb];
      f[fb] = fa;
    }
    else{ // fa 掛 fb
      size[fb] += size[fa];
      f[fa] = fb;
    }
  }
}
```

# 練習題目與題解

[牛客NowCoder 並查集的實現](/posts/NowCoder/ImplementDisjointSet)
[洛谷LuoGu 【模板】并查集](/posts/LuoGu/P3367)
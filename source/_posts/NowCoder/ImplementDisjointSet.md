---
title: ImplementDisjointSet
mathjax: true
tags:
  - Competitive Programming
  - NowCoder
  - DisjointSet
categories:
  - 解題紀錄
  - NowCoder
date: 2026-03-18 14:13:40
---

題目:
https://www.nowcoder.com/practice/e7ed657974934a30b2010046536a5372

<!-- more -->

```cpp=
#include <bits/stdc++.h>
#define MAXN 1000005
using namespace std;

vector<int> v(MAXN), f(MAXN), sz(MAXN);

int find(int a){
    return ((f[a] == a) ? a : (f[a] = find(f[a])));
}

bool isSameSet(int a, int b){
    return find(a) == find(b);
}

void Union(int a, int b){
    int fa = find(a);
    int fb = find(b);
    if(fa != fb){
        if(sz[fa] >= sz[fb]){
            sz[fa] += sz[fb];
            f[fb] = fa;
        }
        else{
            sz[fb] += sz[fa];
            f[fa] = fb;
        }
    }
}

int main(){
    int n, m;
    cin >> n >> m;
    for(int i=0; i<=n; ++i){
        f[i] = i;
        sz[i] = 1;
    }
    int op, x, y;
    while(m--){
        cin >> op >> x >> y;
        if(op == 1){
            if(isSameSet(x, y)) printf("Yes\n");
            else printf("No\n");
        }
        else Union(x, y);
    }
    return 0;
}
```
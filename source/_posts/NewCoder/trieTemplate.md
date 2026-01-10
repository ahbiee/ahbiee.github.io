---
title: trieTemplate
mathjax: true
tags:
  - Competitive Programming
  - NewCoder
categories:
  - 解題紀錄
  - 牛客
date: 2026-01-11 03:49:44
---

題目:
https://www.nowcoder.com/practice/7f8a8553ddbf4eaab749ec988726702b

<!-- more -->

```cpp=
#include <bits/stdc++.h>
#pragma GCC optimize("O3,unroll-loops")
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")
#define pb push_back
#define eb emplace_back
#define mp make_pair
#define all(x) (x).begin(), (x).end()

using namespace std;
using ll = long long;
using pii = pair<int, int>;

#define MAXN 150001

int tree[MAXN][26] = {};
int passed[MAXN] = {};
int stop[MAXN] = {};
int cnt = 1;

void init(){
    for(int i=1; i<=cnt; ++i){
        for(int j=0; j<26; ++j) tree[i][j] = 0;
        passed[i] = 0;
        stop[i] = 0;
    }
    cnt = 1;
}

void insert(string word){
    int curr = 1; // start from root
    ++passed[curr];
    for(int i=0, path; i<word.length(); ++i){
        path = word.at(i) - 'a';
        if(tree[curr][path] == 0){
            tree[curr][path] = ++cnt;
        }
        curr = tree[curr][path];
        ++passed[curr];
    }
    ++stop[curr];
}

int search(string word){
    int curr = 1;
    for(int i=0, path; i<word.length(); ++i){
        path = word.at(i) - 'a';
        if(tree[curr][path] == 0) return 0;
        curr = tree[curr][path];
    }
    return stop[curr];
}

int prefixNumber(string word){
    int curr = 1;
    for(int i=0, path; i<word.length(); ++i){
        path = word.at(i) - 'a';
        if(tree[curr][path] == 0) return 0;
        curr = tree[curr][path];
    }
    return passed[curr];
}

void erase(string word){
    if(search(word) == 0) return;
    int curr = 1;
    --passed[curr];
    for(int i=0, path; i<word.length(); ++i){
        path = word.at(i) - 'a';
        if(--passed[tree[curr][path]] == 0){
            tree[curr][path] = 0;
            return;
        }
        curr = tree[curr][path];
    }
    --stop[curr];
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int m;
    cin >> m;

    int op;
    string word;
    while(m--){
        cin >> op >> ws >> word;
        switch(op){
            case 1:
                insert(word);
                break;
            case 2:
                erase(word);
                break;
            case 3:
                if(search(word)) cout << "YES\n";
                else cout << "NO\n";
                break;
            case 4:
                cout << prefixNumber(word) << '\n';
                break;
            default:
                cout << "FUCK\n";
        }
    }
    return 0;
}
```
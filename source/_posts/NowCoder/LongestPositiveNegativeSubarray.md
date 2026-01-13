---
title: LongestPositiveNegativeSubarray
mathjax: true
tags:
  - Competitive Programming
  - NowCoder
  - PrefixSum
categories:
  - 解題紀錄
  - NowCoder
date: 2026-01-13 18:34:17
---

題目:
https://www.nowcoder.com/practice/545544c060804eceaed0bb84fcd992fb

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

#define MAXN 100005

int arr[MAXN] = {};
int ans[MAXN] = {};
int n;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    while(cin >> n){
        for(int i=0; i<n; ++i){
            cin >> arr[i];
            if(arr[i] > 0) ans[i] = 1;
            else if(arr[i] < 0) ans[i] = -1;
        }

        map<int, int> mp; // <prefixSum, firstIndex>
        mp.insert({0, -1}); // 0 is found at first (subarray length: -1)

        int sum = 0;
        int answer = 0;
        for(int i=0; i<n; ++i){
            sum += ans[i];
            if(mp.count(sum)) answer = max(answer, i - mp[sum]); // if sum already exists, we check the maximum length that we can go left
            else mp[sum] = i;
        }
        cout << answer;

        for(int i=0; i<n; ++i) arr[i] = ans[i] = 0;
    }
    return 0;
}
```
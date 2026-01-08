---
title: LineSegmentCoincide
mathjax: true
tags:
  - Competitive Programming
  - NewCoder
categories:
  - 解題紀錄
  - 牛客
date: 2026-01-08 20:22:09
---

題目:
https://www.nowcoder.com/practice/1ae8d0b6bb4e4bcdbf64ec491f63fc37

<!-- more -->

```cpp=
#include <bits/stdc++.h>
#define pb push_back
#define eb emplace_back
#define mp make_pair

using namespace std;
using ll = long long;
using pii = pair<int, int>;

int n; // n <= 10^4
vector<pii> line; // start, end <= 10^5
priority_queue<int, vector<int>, greater<int>> heap; // 要用小根堆

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    while(cin >> n){
        // 開始前要先確保清空
        line.clear();
        while(!heap.empty()) heap.pop();

        int x, y;
        for(int i=0; i<n; ++i){
            cin >> x >> y;
            line.eb(x, y);
        }
        sort(line.begin(), line.end(), [](auto&a, auto&b){return a.first < b.first;}); // 應為 a.first < b.first, 不能用 <=

        size_t ans = 0;
        for(int i=0; i<n; ++i){
            while(heap.size() > 0 && heap.top() <= line[i].first) heap.pop();
            heap.push(line[i].second);
            ans = max(ans, heap.size());
        }

        cout << ans << '\n';
    }
    return 0;
}
```
---
title: CountConsistentKeys
mathjax: true
tags:
  - Competitive Programming
  - LeetCode
categories:
  - 解題紀錄
  - LeetCode
date: 2026-01-12 03:29:53
---

題目:
https://www.nowcoder.com/practice/c552d3b4dfda49ccb883a6371d9a6932

<!-- more -->

```cpp=
#define MAXN 2000001

int tree[MAXN][12] = {}; // 0~9, #, -
int passed[MAXN] = {};
int cnt = 1;

class Solution {
public:
    void reset(){
        for(int i=1; i<=cnt; ++i){
            for(int j=0; j<12; ++j) tree[i][j] = 0;
            passed[i] = 0;
        }
        cnt = 1;
    }

    int path(char ch){
        if(ch == '#') return 10;
        else if(ch == '-') return 11;
        else return ch - '0';
    }

    void insert(string s){
        int curr = 1;
        passed[curr]++;
        for(int i=0, p; i<s.length(); ++i){
            p = path(s[i]);
            if(tree[curr][p] == 0) // 這個 0 代表的是是否存在節點，與path本身無關
                tree[curr][p] = ++cnt;
            curr = tree[curr][p];
            passed[curr]++;
        }
    }

    int countPrefix(string s){
        int curr = 1;
        for(int i=0, p; i<s.length(); ++i){
            p = path(s[i]);
            if(tree[curr][p] == 0) return 0;
            curr = tree[curr][p];
        }
        return passed[curr];
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * 
     * @param b int整型vector<vector<>> 
     * @param a int整型vector<vector<>> 
     * @return int整型vector
     */
    vector<int> countConsistentKeys(vector<vector<int> >& b, vector<vector<int> >& a) {
        reset();
        string word;
        for(vector<int>& v : a){
            word = "";
            for(int i=0; i<v.size()-1; ++i){
                word.append(to_string(v[i+1]-v[i])).append("#");
            }
            insert(word);
        }

        vector<int> ans;
        
        string prefix;
        for(int i=0; i<b.size(); ++i){
            prefix = "";
            int nums[b[i].size()];
            for(int j=0; j<b[i].size(); ++j) nums[j] = b[i][j];
            for(int j=0; j<b[i].size()-1; ++j){
                prefix.append(to_string(nums[j+1]-nums[j])).append("#");
            }
            ans.push_back(countPrefix(prefix));
        }

        return ans;
    }
};
```
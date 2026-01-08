---
title: XSS 學習筆記
mathjax: true
tags:
  - 資訊安全
categories:
  - 資訊安全
  - 學習筆記
date: 2025-12-05 19:04:04
description: 有關XSS的資訊
---

<!-- more -->

總結來說，XSS(Cross Site Scripting)就是透過各種方式進行惡意script的注入與執行

# Reflected 反射型

## 介紹

反射型XSS的主要手段是透過網站的`搜尋功能`
假設我們在youtube搜尋`音樂`，那youtube的URL欄就會顯示
> https://www.youtube.com/results?search_query=音樂

如果youtube沒有對搜索出來的URL進行過濾，且URL中包含著惡意代碼，則惡意代碼會在使用者端的網頁被執行

## 範例
https://xss-game.appspot.com/
以此網站第一題為例，我們可以在網頁中搜尋，他會自動反饋我們搜尋的結果
![page](/images/XSS/xss-game_page.png)

例如輸入 test
![test](/images/XSS/xss-game_test.png)

我們看到網頁原始碼，可以看到使用者輸入的文字會被包在\<b>標籤裡面
![source](/images/XSS/xss-game_source.png)

我們嘗試附加上\<h1>標籤，發現網頁允許我們在URL中寫入HTML語法
![h1](/images/XSS/xss-game_h1.png)

因此我們就可以使用javascript的alert語法觸發漏洞
![alert](/images/XSS/xss-game_alert.png)
![succeed](/images/XSS/xss-game_succeed.png)

這就是Reflected XSS的經典範例
真正的攻擊者一旦發現alert會成功被觸發，即代表網頁有該部分的漏洞，就會發起攻擊了

# Stored 儲存型

## 介紹
常見於可以留言的網站，例如youtube影片底下的留言區
假設網站並沒有對使用者的留言進行過濾，而使用者在留言區輸入了惡意的script代碼
則網站會將代碼保存在資料庫中，且每一個點進來的其他使用者都會觸發這段代碼

## 範例
https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded
以PortSwigger中的此題為例，我們可以在留言區輸入訊息，並在下一次訪問網站時會看到
隨便點開網頁中的一個文章，在評論區寫點東西
![post](/images/XSS/stored_post.png)

可以在該文章下看到自己的留言
並且這次我們輸入alert語法後提交
![posted](/images/XSS/stored_posted.png)

會發現網頁跳出通過lab的通知
![passed](/images/XSS/stored_passed.png)

回到網頁的文章，會發現跳出alert的框框
![alert](/images/XSS/stored_alert.png)

如此一來就代表我們就成功實作了Stored XSS，script成功被保存在伺服器中
如果有心人士將script的內部改成惡意代碼
那麼每一個訪問到該網站的人都會被影響（非自願!）

# DOM
某些網站為了方便使用者跳轉頁面並減少對伺服器的請求
會直接在頁面下使用`#`的分頁，在客戶端直接進行讀取，因此不會在伺服器端被觸發
而攻擊者想要攻擊就需要同時具備來源(Source)與方法(Sink)
例如location.hash是一個來源，document.write則是可以寫入數據的方法
資料將Source作為入口，未經過伺服器端處理後直接執行了Sink

## 範例
https://xss-game.appspot.com/
與Reflected XSS相同的網站，以第三題為例

開啟image 1，會發現網址有#1
![img1](/images/XSS/DOM_img1.png)

開啟image 2，會發現網址有#2
![img2](/images/XSS/DOM_img2.png)

我們在#後方隨便輸入數字，發現網頁會去找該數字所存的圖片，但是找不到
![img123](/images/XSS/DOM_img123.png)

查看網頁原始碼，發現搜尋的內容被放在\<div>中
這個\<div>的id設為"tabContent"，id是方便javascript操作的屬性
![source](/images/XSS/DOM_source.png)

查看網站提供的目標javascript代碼，發現網頁在尋找圖片是透過
前綴網址 \`/static/level3/cloud" 加上 數字 num 加上 後綴格式 ".jpg\` 的形式組成的
![jssource](/images/XSS/DOM_jssource.png)

由於這段網址是用 + 號進行網址組成，我們可以用一個`'`提前截斷，導致找不到圖片所導向的網址
後面再加上html中，img屬性的 onerror功能，當找不到圖片所導向的網址時觸發onerror的script
![typein](/images/XSS/DOM_typein.png)

最終就可以成功觸發onerror的指令
![alert](/images/XSS/DOM_alert.png)

回去查看網頁原始碼，看到前端中的img屬性被加上了 onerror屬性
後面的 .jpg' 由於是不完整的指令，因此自動跳過不觸發，成功完成了script植入
![source2](/images/XSS/DOM_source2.png)
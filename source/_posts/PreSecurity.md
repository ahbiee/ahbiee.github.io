---
title: PreSecurity 學習筆記
mathjax: true
tags:
  - 資訊安全
categories:
  - 資訊安全
  - 學習筆記
date: 2025-12-31 11:30:24
description: TryHackMe - Pre Security 學習筆記
---

<!-- more -->
# 1. Introduction to Cyber Security

## Offensive Security (red teaming)

**工具**:dirb
實作是用brute-force(暴力破解)，會使用common.txt的內容依序查詢網頁是否存在特定URL，若成功搜尋到將會列出
![dirb](/images/PreSecurity/dirb.png)

## Defensive Security (blue teaming)
防禦像是建城堡，一層一層疊加，稱為 **Defence in Depth**，表示如果有一個防禦失效了還可以讓其他的防禦進行補防

通常會由不同的人負責不同的任務，簡易的分類如下
1. Monitoring and Detecting: 觀察網路與系統活動，抵禦可疑行為，例如來自國外的登入請求
2. Incident Response: 如果證實可疑行為並觸發警報，團隊需要快速集結並處理
3. Threat Intelligence: 了解攻擊者最新的方法、攻擊目標，並藉此強化自己的防禦
4. Vulnerability Management: 修復軟體或系統錯誤可以降低被攻擊的機率，可以觀察攻擊者善於攻擊的特定系統漏洞
5. Investigation and Analysis: 防禦者時刻監控組織內部，區分正常活動跟可疑行為，並深入挖掘細節取得有價值的情報

而以下是防禦措施的例子
- Employee Traning: 人為因素不能不防，因此團隊成員的資安意識很重要
- Intrusion Detection Systems (IDS): 會24/7自動監測可疑狀況，並在發現問題(如穿越網路或系統)時回報，是一個很好的自動工具
- Firewalls: 防火牆是用來抵禦網路攻擊的，管理哪些請求會被接受，哪些會被駁回
- Security Policies: 可以設定要block的網站，或者是要求極強的密碼，避免意外被攻擊或滲透

**Security Operations Centre (SOC)**
類似防禦指揮中心，是一群人的團隊，使用工具(如IDS, SIEMs)監測異常行為，並做出回應與處理

**SIEMs: The Defensive Security Radar**
負責收集與整合(如來自IDS, 防火牆的訊息)，產生數據並提供介面讓分析人員查看

抵禦的方法舉例:
1. 檢查admin log
2. block可疑的ip
3. 限制訪問網站的速度(rate limiting)

## Careers

1. Security Anaylist: 分析安全狀況、寫安全報告(如問題、應對措施)、制定安全計畫
2. Security Engineer: 進行滲透測試，檢查軟體的安全措施，並對不安全的內容產生報告
3. Incident responder: 需要高效應對安全漏洞，在發生攻擊時進行評估與應對 (通常壓力很大)
4. Digital Forensics Examiner: 在守法的前提下，收集並分析證據，類似偵探進行破案
5. Malware Analyst: 分析可疑(或有害)程序，也被稱為逆向工程師(Reverse-Engineer)。目標是將機器語言轉為可讀程式碼，通常使用底層語言(如組合語言、C語言)，了解程序的目標並找出檢測方法
6. Penetration Tester: 又稱為道德駭客(Ethical hacking)，負責測試公司內部系統與軟體的安全性，透過找到的漏洞評估在各種情況下的風險
7. Red Teamer: 類似於Penetration Tester，但目標更明確，要完全模仿犯罪者的行為，模擬惡意攻擊，在避免被發現的前提下，盡可能找到各種形式的漏洞，紅隊演練持續時間可長達一個月

# 2. Network Fundamentals

# 3. How The Web Works

# 4. Linux Fundamentals

# 5. Windows Fundamentals
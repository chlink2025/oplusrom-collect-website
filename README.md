# OPlus ROM 下載站

一個簡單的OPPO/OnePlus的rom的下載站點。

- 基於 Cloudflare Pages 部署
- 使用 GitHub 作為資料源
目前網站地址：  
https://oplusromdl.pages.dev/

## 功能特色
- 無任何人機
- 對coloros16的rom的鏈接，會嘗試透過 Cloudflare Functions並添加 `userid: oplus-ota|` 請求頭，獲取真實直接使用下載地

## links 資料來源

本項目所有 ROM 下載連結均來自公開的官方 OTA 伺服器，並由以下倉庫收集與整理：
[來源](https://github.com/chlink2025/oplusrom)

**重要聲明**：
- 所有下載連結均為官方伺服器地址，項目僅提供索引與輔助訪問方式。
- 本項目不提供 ROM 下載加速或鏡像服務，僅顯示官方連結。

## 如何部署自己的版本

1. Fork 或複製本倉庫
2. （可選）修改 `index.html` 中的 `repo = 'chlink2025/oplusrom'` 為你自己的資料倉庫
3. 在 Cloudflare Pages 連接你的 GitHub 倉庫
   - 框架預設：None（純靜態）
   - 建置命令：留空
   - 輸出目錄：留空
4. 部署完成後，自訂域名（可選）
5. 如果要使用重定向coloros16鏈接的功能，請確保倉庫中有 `functions/proxy.js` 檔案

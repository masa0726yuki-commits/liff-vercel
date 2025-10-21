# はじめての LIFF（超入門）

このフォルダをまるごと公開して、LINE Developers コンソールで LIFF ID を発行・設定すれば動きます。

## 使い方（3分）
1. この ZIP を展開して `index.html` をエディタで開き、`YOUR_LIFF_ID_HERE` を実際の LIFF ID に置き換えます。
2. Netlify Drop（https://app.netlify.com/drop）に `index.html` をドラッグ＆ドロップして公開URLを入手します。
3. LINE Developers コンソール → 対象の「LINEログイン」チャネル → **LIFF** タブ → **Add** から
   - **Endpoint URL** に 2 で得た公開URLを設定
   - 作成後に表示される **LIFF ID** を 1 に反映（※順序は前後してもOK）
4. 表示される **LIFF URL**（`https://liff.line.me/xxxxx`）をスマホの LINE で開いて動作確認。

## 注意
- `liff.init({ liffId })` を必ず最初に呼びます。これがないと他のAPIは動きません。
- `sendMessages` は LINE アプリ内（LIFFブラウザ）でのみ利用できます。外部ブラウザでは使えません。

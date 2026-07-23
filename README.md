# AKELBA Website Ver5.0

AKELBAの本番公開用公式サイトです。静的HTML/CSS/JavaScriptで構成し、GitHub Pagesでそのまま公開できます。

## 公開ファイル
- `index.html`：トップページ
- `service.html`：サービス
- `diagnosis.html`：無料店舗健康診断
- `about.html`：AKELBAについて
- `contact.html`：お問い合わせ
- `privacy.html`：プライバシーポリシー
- `404.html`：エラーページ
- `CNAME`：独自ドメイン `akelba.jp`
- `robots.txt` / `sitemap.xml`：検索エンジン向け

## 更新時に触る場所
- 連絡先・Instagram・GoogleフォームURL：`assets/config.js`
- 見た目：`assets/styles.css`
- 各ページの文章：各HTML

## 公開手順
1. リポジトリ直下へ、このフォルダ内のファイルをすべてアップロード
2. GitHub Pagesを `main` / `(root)` で公開
3. GitHub Pagesの Custom domain に `akelba.jp` を設定
4. DNSをGitHub Pages向けに設定後、HTTPSを有効化

## 注意
`CNAME` は独自ドメイン接続用です。DNS設定が完了する前でも、GitHub Pagesの仮URLで確認できます。

# Next.js + Laravel TODO

Next.js の画面と Laravel API で TODO を管理するサンプルアプリです。データは Laravel の SQLite データベースに保存されます。

## Codespaces

1. GitHub で **Code** → **Create codespace on main** を選びます。
2. コンテナ作成後、`postCreateCommand` が依存関係、Laravel 本体、SQLite DB を自動準備します。
3. ターミナルで `cd frontend && npm run dev` を実行し、ポート 3000 を開きます。

Laravel API はポート 8000、Next.js は `/api/*` を API にプロキシするため、ブラウザ側の追加設定は不要です。

## ローカル実行

Docker Desktop を起動してから以下を実行します。

```bash
docker compose up -d
docker compose exec frontend bash .devcontainer/post-create.sh
docker compose exec frontend bash -lc 'cd frontend && npm run dev'
```

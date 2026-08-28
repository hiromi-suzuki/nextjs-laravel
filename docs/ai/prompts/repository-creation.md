# nextjs-laravel 再現用プロンプト

以下の要件を満たす `nextjs-laravel` という名前の GitHub リポジトリを作成し、実装してください。

## 目的

Next.js の画面と Laravel の API で TODO リストを管理するサンプルアプリケーションを作成する。ユーザー認証は不要とする。データは Laravel の SQLite データベースに保存する。

## 技術スタックとバージョン

- フロントエンド: Next.js 14.2.31、React 18.3.1、TypeScript 5.7.2
- Node.js: 22
- バックエンド: Laravel 12.x（PHP 8.3 で動作するバージョンに固定）
- PHP: 8.3
- Composer: 2.x
- データベース: SQLite（PDO SQLite を有効化）
- コンテナOS: Debian Bookworm

## フロントエンド要件

- Next.js App Router を使用する。
- `/` に TODO リスト画面を実装する。
- 画面上部に `NEXT.JS × LARAVEL`、見出しに `TODO リスト` を表示する。
- TODO のタイトルを入力して追加できる。空文字または空白だけの入力は追加しない。入力最大長は255文字とする。
- TODO 一覧を表示する。初期表示時に API から取得し、作成日時の新しい順に並べる。
- 各 TODO にチェックボックスを表示し、完了状態を切り替えられる。完了したタイトルには取り消し線を表示する。
- 各 TODO に削除ボタンを表示する。
- TODO がない場合は `TODO はまだありません。` と表示する。
- API 通信中は `読み込み中...`、通信失敗時は画面上にエラーメッセージを表示する。
- API の呼び出し先は `/api/todos` とし、Next.js の rewrite で Laravel API（`http://backend:8000`）へプロキシする。ブラウザから backend のホスト名を直接参照しない。
- ポート3000で `next dev -H 0.0.0.0` を実行できるようにする。
- UI は白いカードを淡い青色の背景上に配置し、追加ボタンは青色、削除ボタンは赤色とする。レスポンシブに表示できるようにする。

## Laravel API 要件

- API リソースとして `/api/todos` を実装する。
- `GET /api/todos`: TODO 一覧を `created_at` の降順で JSON 配列として返す。
- `POST /api/todos`: `title`（必須、文字列、最大255文字）を受け取り、`completed=false` で作成して HTTP 201 を返す。
- `PATCH /api/todos/{todo}`: `title`（任意、必須文字列、最大255文字）と `completed`（任意、boolean）を更新して JSON を返す。
- `DELETE /api/todos/{todo}`: TODO を削除し、HTTP 204 を返す。
- モデルの `title` と `completed` は mass assignment 対象にし、`completed` は boolean として cast する。
- `todos` テーブルは `id`、`title`、`completed`（デフォルト false）、`created_at`、`updated_at` を持つ。

## Dev Container / Codespaces 要件

- `.devcontainer/devcontainer.json` と `docker-compose.yml` を作成する。
- `frontend` サービスは `mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm` を使用し、ポート3000を公開する。
- `backend` サービスは PHP 8.3 Bookworm の Dockerfile をビルドし、Composer 2、`pdo_sqlite`、`libsqlite3-dev`、`pkg-config` を使用可能にする。ポート8000を公開する。
- 両サービスからリポジトリを `/workspaces/nextjs-laravel` にマウントする。
- Dev Container の対象サービスは `frontend` とし、frontend と backend の両方を起動する。ポート3000と8000を転送する。
- Codespaces 作成後、frontend の依存関係を `npm install` でインストールする。
- backend 起動時に、Laravel が未作成なら Composer で作成し、API設定、ルート、モデル、コントローラー、マイグレーション、`.env`、SQLiteファイルを準備してマイグレーションを実行する。その後 `php artisan serve --host=0.0.0.0 --port=8000` で起動する。
- backend の初期化を繰り返しても、既存の Laravel プロジェクトや `APP_KEY` を壊さない。

## README 要件

README に以下を記載する。

1. アプリケーションの概要
2. Codespaces での起動手順
3. Docker Desktop を使ったローカル起動手順
4. frontend はポート3000、Laravel API はポート8000であること
5. `/api/*` が Laravel API にプロキシされること

## 完了条件

- `docker compose config` が成功する。
- Dev Container を起動すると frontend と backend の両方が起動する。
- frontend で `npm run build` が成功する。
- ブラウザでポート3000を開くと TODO リスト画面が表示される。
- TODO の追加、完了状態の変更、削除が SQLite に永続化される。
- `GET /api/todos` などの API がポート8000で利用できる。
- README の手順だけで、別の開発者が環境を起動して動作確認できる。

# my-app

## 開発環境構築

1. DockerでPostgreSQLを起動
2. バックエンド（Node.js + TypeScript）の作成
```
mkdir backend
cd backend
npm init -y
```
3. 必要なパッケージのインストール
```
npm install express @prisma/client dotenv cors
npm install -D typescript @types/node @types/express @types/cors ts-node-dev prisma
```
4. TypeScript設定ファイルの生成
```
npx tsc --init
```
5. Prisma（ORM）を初期化してDockerのPostgreSQLと接続
```
npx prisma init
```
6. .env ファイル内の DATABASE_URL を、Dockerの接続情報に書き換え
7. フロントエンド（Next.js）の作成
```
cd ..
npx create-next-app@latest frontend
```
8. backend/package.json の scripts に "dev": "ts-node-dev src/index.ts" を追加
9. backend実行
```
cd backend
npm run dev

Back-end: http://localhost:8000
Database: localhost:5432
```
10. frontend起動
```
cd frontend
npm run dev

Front-end: http://localhost:3000
```

git-merge
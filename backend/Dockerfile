# 1. ビルド用ベースイメージ
FROM node:20-alpine AS builder

WORKDIR /app

# パッケージ定義をコピーして依存関係をインストール
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

# ソースコードをコピーしてビルド
COPY . .
RUN npx prisma generate
RUN npm run build

# 2. 実行用軽量イメージ
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 必要なファイルのみコピー
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# ポートを指定（Express が 8000 で待受けている場合）
EXPOSE 8000

# Prisma マイグレーション実行後にアプリを起動
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
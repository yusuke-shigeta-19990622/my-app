import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// ヘルスチェック & DB導通確認
app.get('/api/health', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({
      status: 'ok',
      message: 'Database connection successful!',
      userCount,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: String(error) });
  }
});

// テストユーザー追加 API
app.post('/api/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});

// ユーザー一覧取得 API
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
'use client';

import { useEffect, useState } from 'react';

// Userの型定義
type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // バックエンドAPIからユーザー一覧を取得
    fetch('http://localhost:8000/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('データの取得に失敗しました');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">読み込み中...</div>;
  if (error) return <div className="p-8 text-red-500">エラー: {error}</div>;

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">ユーザー一覧</h1>

        {users.length === 0 ? (
          <p className="text-gray-500">ユーザーが登録されていません。</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 bg-white rounded-lg shadow border border-gray-100"
              >
                <div className="font-semibold text-gray-900">
                  {user.name || '名前なし'}
                </div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-xs text-gray-400 mt-2">
                  登録日: {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
import type { APIRoute } from 'astro';
import { createUser } from '../../../services/database';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
      return new Response(
        JSON.stringify({ error: '所有字段都不能为空' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (password !== confirmPassword) {
      return new Response(
        JSON.stringify({ error: '两次输入的密码不一致' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 创建新用户
    const newUser = await createUser(name, password, email);

    return new Response(
      JSON.stringify({ success: true, user: { id: newUser.id, email: newUser.email, username: newUser.username } }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('注册错误:', error);
    return new Response(
      JSON.stringify({ error: error.message || '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

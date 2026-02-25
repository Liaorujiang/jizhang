import type { APIRoute } from 'astro';
import { getUserByEmail, verifyPassword } from '../../../services/database';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: '邮箱和密码不能为空' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 查找用户
    const user = await getUserByEmail(email);

    if (!user) {
      return new Response(
        JSON.stringify({ error: '邮箱或密码错误' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 验证密码
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: '邮箱或密码错误' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 生成会话ID
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // 保存会话到 cookies
    cookies.set('session', sessionId, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7天
      path: '/'
    });

    // 保存用户信息到 cookies
    cookies.set('user', JSON.stringify({
      id: user.id,
      email: user.email,
      username: user.username
    }), {
      httpOnly: false,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return new Response(
      JSON.stringify({ success: true, user: { id: user.id, email: user.email, username: user.username } }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('登录错误:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

import type { APIRoute } from 'astro';
import { updateUser } from '../../../services/database';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const userCookie = cookies.get('user');
    
    if (!userCookie) {
      return new Response(
        JSON.stringify({ error: '未登录' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = JSON.parse(userCookie.value);
    const body = await request.json();
    
    const { username, password } = body;
    
    // 更新用户信息
    const updatedUser = await updateUser(user.id, username, password);

    // 更新 cookie 中的用户信息
    cookies.set('user', JSON.stringify({
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username
    }), {
      httpOnly: false,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return new Response(
      JSON.stringify({ success: true, user: { id: updatedUser.id, email: updatedUser.email, username: updatedUser.username } }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('更新用户信息错误:', error);
    return new Response(
      JSON.stringify({ error: error.message || '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
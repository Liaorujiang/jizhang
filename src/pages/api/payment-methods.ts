import type { APIRoute } from 'astro';
import { getPaymentMethodsByUserId, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } from '../../services/database';

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const userCookie = cookies.get('user');
    
    if (!userCookie) {
      return new Response(
        JSON.stringify({ error: '未登录' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = JSON.parse(userCookie.value);
    
    // 获取用户的所有支付方式
    const paymentMethods = await getPaymentMethodsByUserId(user.id);
    
    return new Response(
      JSON.stringify({ success: true, paymentMethods }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('获取支付方式错误:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

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
    
    const { name } = body;
    
    if (!name) {
      return new Response(
        JSON.stringify({ error: '缺少必要字段' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 创建支付方式
    const newPaymentMethod = await createPaymentMethod(name, user.id);

    return new Response(
      JSON.stringify({ success: true, paymentMethod: newPaymentMethod }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('添加支付方式错误:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
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
    
    const { id, name } = body;
    
    if (!id || !name) {
      return new Response(
        JSON.stringify({ error: '缺少必要字段' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 更新支付方式
    const updatedPaymentMethod = await updatePaymentMethod(id, name, user.id);

    return new Response(
      JSON.stringify({ success: true, paymentMethod: updatedPaymentMethod }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('更新支付方式错误:', error);
    return new Response(
      JSON.stringify({ error: error.message || '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
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
    
    const { id } = body;
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: '缺少必要字段' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 删除支付方式
    await deletePaymentMethod(id, user.id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('删除支付方式错误:', error);
    return new Response(
      JSON.stringify({ error: error.message || '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

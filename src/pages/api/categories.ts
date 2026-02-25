import type { APIRoute } from 'astro';
import { getCategoriesByUserId, createCategory, updateCategory, deleteCategory } from '../../services/database';

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
    
    // 获取用户的所有分类
    const categories = await getCategoriesByUserId(user.id);
    
    return new Response(
      JSON.stringify({ success: true, categories }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('获取分类错误:', error);
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
    
    const { name, type, parentId } = body;
    
    if (!name || !type) {
      return new Response(
        JSON.stringify({ error: '缺少必要字段' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 创建分类
    const newCategory = await createCategory(name, type, parentId || null, user.id);

    return new Response(
      JSON.stringify({ success: true, category: newCategory }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('添加分类错误:', error);
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
    
    const { id, name, parentId } = body;
    
    if (!id || !name) {
      return new Response(
        JSON.stringify({ error: '缺少必要字段' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 更新分类
    const updatedCategory = await updateCategory(id, name, parentId || null, user.id);

    return new Response(
      JSON.stringify({ success: true, category: updatedCategory }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('更新分类错误:', error);
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

    // 删除分类
    await deleteCategory(id, user.id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('删除分类错误:', error);
    return new Response(
      JSON.stringify({ error: error.message || '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

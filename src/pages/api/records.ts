import type { APIRoute } from 'astro';
import { getRecordsByUserId, createRecord, getCategoriesByUserId, getPaymentMethodsByUserId } from '../../services/database';

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    const userCookie = cookies.get('user');
    
    if (!userCookie) {
      return new Response(
        JSON.stringify({ error: '未登录' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = JSON.parse(userCookie.value);
    
    // 获取查询参数
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    
    // 获取所有记录
    let records = await getRecordsByUserId(user.id);
    
    // 根据类型筛选
    if (type) {
      records = records.filter(record => record.type === type);
    }
    
    // 获取分类和支付方式信息
    const categories = await getCategoriesByUserId(user.id);
    const paymentMethods = await getPaymentMethodsByUserId(user.id);
    
    // 转换记录格式，添加分类和支付方式名称
    const formattedRecords = records.map(record => {
      const category = categories.find(c => c.id === record.categoryId);
      const paymentMethod = paymentMethods.find(p => p.id === record.paymentMethodId);
      
      return {
        ...record,
        categoryName: category?.name || '',
        paymentMethodName: paymentMethod?.name || ''
      };
    });
    
    return new Response(
      JSON.stringify({ success: true, records: formattedRecords }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('获取交易记录错误:', error);
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
    
    const { type, amount, categoryId, paymentMethodId, date, remark } = body;
    
    if (!type || !amount || !categoryId || !date) {
      return new Response(
        JSON.stringify({ error: '缺少必要字段' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 创建交易记录
    const newRecord = await createRecord(
      type,
      amount,
      categoryId,
      paymentMethodId || null,
      new Date(date),
      remark || null,
      user.id
    );

    return new Response(
      JSON.stringify({ success: true, record: newRecord }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('添加交易记录错误:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

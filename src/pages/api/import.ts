import type { APIRoute } from 'astro';
import { importData } from '../../services/database';
import { getUserById } from '../../services/database';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 获取用户信息
    const userCookie = cookies.get('user')?.value;
    if (!userCookie) {
      return new Response(JSON.stringify({
        success: false,
        error: '未登录' 
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // 解析用户信息
    let userInfo;
    try {
      userInfo = JSON.parse(userCookie);
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: '无效的用户信息' 
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const userId = userInfo.id;
    if (!userId) {
      return new Response(JSON.stringify({
        success: false,
        error: '无效的用户ID' 
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // 验证用户是否存在
    const user = await getUserById(userId);
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: '用户不存在' 
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // 获取请求数据
    const data = await request.json();
    
    // 导入数据
    await importData(userId, data);
    
    return new Response(JSON.stringify({
      success: true,
      message: '数据导入成功' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('导入数据失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: '导入数据失败: ' + (error as Error).message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

import { db } from 'astro:db';
import { Category, PaymentMethod } from './config';

// https://astro.build/db/seed
export default async function seed() {
  // 初始化默认分类
  await db.insert(Category).values([
    // 收入分类
    { name: '工资', type: 'income', parentId: null, userId: 1 },
    { name: '奖金', type: 'income', parentId: null, userId: 1 },
    { name: '投资收益', type: 'income', parentId: null, userId: 1 },
    { name: '其他收入', type: 'income', parentId: null, userId: 1 },
    
    // 支出分类
    { name: '餐饮', type: 'expense', parentId: null, userId: 1 },
    { name: '午餐', type: 'expense', parentId: 5, userId: 1 },
    { name: '晚餐', type: 'expense', parentId: 5, userId: 1 },
    { name: '外卖', type: 'expense', parentId: 5, userId: 1 },
    { name: '交通', type: 'expense', parentId: null, userId: 1 },
    { name: '公交', type: 'expense', parentId: 9, userId: 1 },
    { name: '地铁', type: 'expense', parentId: 9, userId: 1 },
    { name: '打车', type: 'expense', parentId: 9, userId: 1 },
    { name: '购物', type: 'expense', parentId: null, userId: 1 },
    { name: '服装', type: 'expense', parentId: 13, userId: 1 },
    { name: '日用品', type: 'expense', parentId: 13, userId: 1 },
    { name: '娱乐', type: 'expense', parentId: null, userId: 1 },
    { name: '电影', type: 'expense', parentId: 16, userId: 1 },
    { name: '游戏', type: 'expense', parentId: 16, userId: 1 },
    { name: '其他支出', type: 'expense', parentId: null, userId: 1 },
    
    // 转账分类
    { name: '银行卡转账', type: 'transfer', parentId: null, userId: 1 },
    { name: '支付宝转账', type: 'transfer', parentId: null, userId: 1 },
    { name: '微信转账', type: 'transfer', parentId: null, userId: 1 }
  ]);
  
  // 初始化默认支付方式
  await db.insert(PaymentMethod).values([
    { name: '现金', userId: 1 },
    { name: '信用卡', userId: 1 },
    { name: '支付宝', userId: 1 },
    { name: '微信', userId: 1 },
    { name: '银行卡', userId: 1 }
  ]);
}

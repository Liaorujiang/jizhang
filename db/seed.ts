import { db } from 'astro:db';
import { Category, PaymentMethod } from './config';

// https://astro.build/db/seed
export default async function seed() {
  // 初始化默认分类
  await db.insert(Category).values([
    // 收入分类
    { name: '工资', type: 'income', parent_id: null },
    { name: '奖金', type: 'income', parent_id: null },
    { name: '投资收益', type: 'income', parent_id: null },
    { name: '其他收入', type: 'income', parent_id: null },
    
    // 支出分类
    { name: '餐饮', type: 'expense', parent_id: null },
    { name: '午餐', type: 'expense', parent_id: 5 },
    { name: '晚餐', type: 'expense', parent_id: 5 },
    { name: '外卖', type: 'expense', parent_id: 5 },
    { name: '交通', type: 'expense', parent_id: null },
    { name: '公交', type: 'expense', parent_id: 9 },
    { name: '地铁', type: 'expense', parent_id: 9 },
    { name: '打车', type: 'expense', parent_id: 9 },
    { name: '购物', type: 'expense', parent_id: null },
    { name: '服装', type: 'expense', parent_id: 13 },
    { name: '日用品', type: 'expense', parent_id: 13 },
    { name: '娱乐', type: 'expense', parent_id: null },
    { name: '电影', type: 'expense', parent_id: 16 },
    { name: '游戏', type: 'expense', parent_id: 16 },
    { name: '其他支出', type: 'expense', parent_id: null },
    
    // 转账分类
    { name: '银行卡转账', type: 'transfer', parent_id: null },
    { name: '支付宝转账', type: 'transfer', parent_id: null },
    { name: '微信转账', type: 'transfer', parent_id: null }
  ]);
  
  // 初始化默认支付方式
  await db.insert(PaymentMethod).values([
    { name: '现金', icon: 'cash' },
    { name: '信用卡', icon: 'credit-card' },
    { name: '支付宝', icon: 'alipay' },
    { name: '微信', icon: 'wechat' },
    { name: '银行卡', icon: 'bank' }
  ]);
}

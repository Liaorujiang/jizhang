import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}

interface Category {
  id: number;
  name: string;
  type: string;
  parentId: number | null;
  userId: number;
  createdAt: Date;
}

interface PaymentMethod {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
}

interface Record {
  id: number;
  type: string;
  amount: number;
  categoryId: number;
  paymentMethodId: number | null;
  date: Date;
  remark: string | null;
  userId: number;
  createdAt: Date;
}

interface Database {
  users: User[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  records: Record[];
}

// 初始化数据库
const adapter = new JSONFile<Database>('db.json');
const defaultData: Database = {
  users: [],
  categories: [],
  paymentMethods: [],
  records: []
};
const db = new Low(adapter, defaultData);

// 初始化默认数据
async function initDatabase() {
  await db.read();
  
  if (!db.data) {
    db.data = {
      users: [],
      categories: [],
      paymentMethods: [],
      records: []
    };
    await db.write();
  }
}

// 用户相关操作
export async function createUser(username: string, password: string, email: string) {
  await initDatabase();
  
  // 检查邮箱是否已存在
  const existingUser = db.data!.users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('邮箱已被注册');
  }
  
  // 生成密码哈希
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // 创建新用户
  const newUser: User = {
    id: db.data!.users.length + 1,
    username,
    password: hashedPassword,
    email,
    createdAt: new Date()
  };
  
  db.data!.users.push(newUser);
  await db.write();
  
  // 为新用户创建默认分类和支付方式
  await createDefaultCategories(newUser.id);
  await createDefaultPaymentMethods(newUser.id);
  
  return newUser;
}

export async function getUserByEmail(email: string) {
  await initDatabase();
  return db.data!.users.find(user => user.email === email);
}

export async function getUserById(id: number) {
  await initDatabase();
  return db.data!.users.find(user => user.id === id);
}

// 分类相关操作
export async function createDefaultCategories(userId: number) {
  await initDatabase();
  
  const defaultCategories: Category[] = [
    // 收入分类
    { id: db.data!.categories.length + 1, name: '工资', type: 'income', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 2, name: '奖金', type: 'income', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 3, name: '投资收益', type: 'income', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 4, name: '其他收入', type: 'income', parentId: null, userId, createdAt: new Date() },
    
    // 支出分类
    { id: db.data!.categories.length + 5, name: '餐饮', type: 'expense', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 6, name: '午餐', type: 'expense', parentId: db.data!.categories.length + 5, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 7, name: '晚餐', type: 'expense', parentId: db.data!.categories.length + 5, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 8, name: '外卖', type: 'expense', parentId: db.data!.categories.length + 5, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 9, name: '交通', type: 'expense', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 10, name: '公交', type: 'expense', parentId: db.data!.categories.length + 9, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 11, name: '地铁', type: 'expense', parentId: db.data!.categories.length + 9, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 12, name: '打车', type: 'expense', parentId: db.data!.categories.length + 9, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 13, name: '购物', type: 'expense', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 14, name: '服装', type: 'expense', parentId: db.data!.categories.length + 13, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 15, name: '日用品', type: 'expense', parentId: db.data!.categories.length + 13, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 16, name: '娱乐', type: 'expense', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 17, name: '电影', type: 'expense', parentId: db.data!.categories.length + 16, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 18, name: '游戏', type: 'expense', parentId: db.data!.categories.length + 16, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 19, name: '其他支出', type: 'expense', parentId: null, userId, createdAt: new Date() },
    
    // 转账分类
    { id: db.data!.categories.length + 20, name: '银行卡转账', type: 'transfer', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 21, name: '支付宝转账', type: 'transfer', parentId: null, userId, createdAt: new Date() },
    { id: db.data!.categories.length + 22, name: '微信转账', type: 'transfer', parentId: null, userId, createdAt: new Date() }
  ];
  
  db.data!.categories.push(...defaultCategories);
  await db.write();
}

export async function getCategoriesByUserId(userId: number) {
  await initDatabase();
  return db.data!.categories.filter(category => category.userId === userId);
}

export async function createCategory(name: string, type: string, parentId: number | null, userId: number) {
  await initDatabase();
  
  const newCategory: Category = {
    id: db.data!.categories.length + 1,
    name,
    type,
    parentId,
    userId,
    createdAt: new Date()
  };
  
  db.data!.categories.push(newCategory);
  await db.write();
  return newCategory;
}

export async function updateCategory(id: number, name: string, parentId: number | null, userId: number) {
  await initDatabase();
  
  const category = db.data!.categories.find(c => c.id === id && c.userId === userId);
  if (!category) {
    throw new Error('分类不存在');
  }
  
  category.name = name;
  category.parentId = parentId;
  await db.write();
  return category;
}

export async function deleteCategory(id: number, userId: number) {
  await initDatabase();
  
  const index = db.data!.categories.findIndex(c => c.id === id && c.userId === userId);
  if (index === -1) {
    throw new Error('分类不存在');
  }
  
  db.data!.categories.splice(index, 1);
  await db.write();
  return true;
}

// 支付方式相关操作
export async function createDefaultPaymentMethods(userId: number) {
  await initDatabase();
  
  const defaultPaymentMethods: PaymentMethod[] = [
    { id: db.data!.paymentMethods.length + 1, name: '现金', userId, createdAt: new Date() },
    { id: db.data!.paymentMethods.length + 2, name: '信用卡', userId, createdAt: new Date() },
    { id: db.data!.paymentMethods.length + 3, name: '支付宝', userId, createdAt: new Date() },
    { id: db.data!.paymentMethods.length + 4, name: '微信', userId, createdAt: new Date() },
    { id: db.data!.paymentMethods.length + 5, name: '银行卡', userId, createdAt: new Date() }
  ];
  
  db.data!.paymentMethods.push(...defaultPaymentMethods);
  await db.write();
}

export async function getPaymentMethodsByUserId(userId: number) {
  await initDatabase();
  return db.data!.paymentMethods.filter(method => method.userId === userId);
}

export async function createPaymentMethod(name: string, userId: number) {
  await initDatabase();
  
  const newPaymentMethod: PaymentMethod = {
    id: db.data!.paymentMethods.length + 1,
    name,
    userId,
    createdAt: new Date()
  };
  
  db.data!.paymentMethods.push(newPaymentMethod);
  await db.write();
  return newPaymentMethod;
}

export async function updatePaymentMethod(id: number, name: string, userId: number) {
  await initDatabase();
  
  const method = db.data!.paymentMethods.find(m => m.id === id && m.userId === userId);
  if (!method) {
    throw new Error('支付方式不存在');
  }
  
  method.name = name;
  await db.write();
  return method;
}

export async function deletePaymentMethod(id: number, userId: number) {
  await initDatabase();
  
  const index = db.data!.paymentMethods.findIndex(m => m.id === id && m.userId === userId);
  if (index === -1) {
    throw new Error('支付方式不存在');
  }
  
  db.data!.paymentMethods.splice(index, 1);
  await db.write();
  return true;
}

// 记录相关操作
export async function getRecordsByUserId(userId: number) {
  await initDatabase();
  return db.data!.records.filter(record => record.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function createRecord(type: string, amount: number, categoryId: number, paymentMethodId: number | null, date: Date, remark: string | null, userId: number) {
  await initDatabase();
  
  const newRecord: Record = {
    id: db.data!.records.length + 1,
    type,
    amount,
    categoryId,
    paymentMethodId,
    date,
    remark,
    userId,
    createdAt: new Date()
  };
  
  db.data!.records.push(newRecord);
  await db.write();
  return newRecord;
}

export async function updateRecord(id: number, type: string, amount: number, categoryId: number, paymentMethodId: number | null, date: Date, remark: string | null, userId: number) {
  await initDatabase();
  
  const record = db.data!.records.find(r => r.id === id && r.userId === userId);
  if (!record) {
    throw new Error('记录不存在');
  }
  
  record.type = type;
  record.amount = amount;
  record.categoryId = categoryId;
  record.paymentMethodId = paymentMethodId;
  record.date = date;
  record.remark = remark;
  await db.write();
  return record;
}

export async function deleteRecord(id: number, userId: number) {
  await initDatabase();
  
  const index = db.data!.records.findIndex(r => r.id === id && r.userId === userId);
  if (index === -1) {
    throw new Error('记录不存在');
  }
  
  db.data!.records.splice(index, 1);
  await db.write();
  return true;
}

// 验证密码
export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// 更新用户信息
export async function updateUser(id: number, username?: string, password?: string) {
  await initDatabase();
  
  const user = db.data!.users.find(u => u.id === id);
  if (!user) {
    throw new Error('用户不存在');
  }
  
  if (username) {
    user.username = username;
  }
  
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }
  
  await db.write();
  return user;
}

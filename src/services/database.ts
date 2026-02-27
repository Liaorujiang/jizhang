import bcrypt from 'bcryptjs';

// 类型定义
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

// 获取D1数据库实例
function getDB() {
  if (typeof DB !== 'undefined') {
    return DB;
  }
  throw new Error('D1 database not available. Please check your Cloudflare Pages database bindings.');
}

// 创建模拟数据库（开发环境使用）
function createMockDB() {
  let data = {
    users: [],
    categories: [],
    paymentMethods: [],
    records: []
  };
  
  return {
    async exec(sql) {
      console.log('Executing SQL:', sql);
      // 模拟执行SQL
    },
    
    async get(sql, params) {
      console.log('Getting data:', sql, params);
      // 模拟查询单个数据
      if (sql.includes('SELECT * FROM users WHERE email =')) {
        return data.users.find(user => user.email === params[0]) || null;
      }
      if (sql.includes('SELECT * FROM users WHERE id =')) {
        return data.users.find(user => user.id === params[0]) || null;
      }
      if (sql.includes('SELECT * FROM categories WHERE id =')) {
        return data.categories.find(cat => cat.id === params[0] && cat.userId === params[1]) || null;
      }
      if (sql.includes('SELECT * FROM paymentMethods WHERE id =')) {
        return data.paymentMethods.find(method => method.id === params[0] && method.userId === params[1]) || null;
      }
      if (sql.includes('SELECT * FROM records WHERE id =')) {
        return data.records.find(record => record.id === params[0] && record.userId === params[1]) || null;
      }
      return null;
    },
    
    async all(sql, params) {
      console.log('Getting all data:', sql, params);
      // 模拟查询多个数据
      if (sql.includes('SELECT * FROM categories WHERE userId =')) {
        return data.categories.filter(cat => cat.userId === params[0]);
      }
      if (sql.includes('SELECT * FROM paymentMethods WHERE userId =')) {
        return data.paymentMethods.filter(method => method.userId === params[0]);
      }
      if (sql.includes('SELECT * FROM records WHERE userId =')) {
        return data.records.filter(record => record.userId === params[0]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      return [];
    },
    
    async run(sql, params) {
      console.log('Running SQL:', sql, params);
      // 模拟执行写操作
      if (sql.includes('INSERT INTO users')) {
        const newId = data.users.length + 1;
        data.users.push({
          id: newId,
          username: params[0],
          password: params[1],
          email: params[2],
          createdAt: params[3]
        });
        return { lastInsertRowid: newId };
      }
      if (sql.includes('INSERT INTO categories')) {
        const newId = data.categories.length + 1;
        data.categories.push({
          id: newId,
          name: params[0],
          type: params[1],
          parentId: params[2],
          userId: params[3],
          createdAt: params[4]
        });
        return { lastInsertRowid: newId };
      }
      if (sql.includes('INSERT INTO paymentMethods')) {
        const newId = data.paymentMethods.length + 1;
        data.paymentMethods.push({
          id: newId,
          name: params[0],
          userId: params[1],
          createdAt: params[2]
        });
        return { lastInsertRowid: newId };
      }
      if (sql.includes('INSERT INTO records')) {
        const newId = data.records.length + 1;
        data.records.push({
          id: newId,
          type: params[0],
          amount: params[1],
          categoryId: params[2],
          paymentMethodId: params[3],
          date: params[4],
          remark: params[5],
          userId: params[6],
          createdAt: params[7]
        });
        return { lastInsertRowid: newId };
      }
      if (sql.includes('UPDATE users')) {
        const user = data.users.find(u => u.id === params[params.length - 1]);
        if (user) {
          user.username = params[0];
        }
      }
      if (sql.includes('UPDATE categories')) {
        const category = data.categories.find(c => c.id === params[2] && c.userId === params[3]);
        if (category) {
          category.name = params[0];
          category.parentId = params[1];
        }
      }
      if (sql.includes('UPDATE paymentMethods')) {
        const method = data.paymentMethods.find(m => m.id === params[1] && m.userId === params[2]);
        if (method) {
          method.name = params[0];
        }
      }
      if (sql.includes('UPDATE records')) {
        const record = data.records.find(r => r.id === params[6] && r.userId === params[7]);
        if (record) {
          record.type = params[0];
          record.amount = params[1];
          record.categoryId = params[2];
          record.paymentMethodId = params[3];
          record.date = params[4];
          record.remark = params[5];
        }
      }
      if (sql.includes('DELETE FROM categories')) {
        data.categories = data.categories.filter(c => !(c.id === params[0] && c.userId === params[1]));
      }
      if (sql.includes('DELETE FROM paymentMethods')) {
        data.paymentMethods = data.paymentMethods.filter(m => !(m.id === params[0] && m.userId === params[1]));
      }
      if (sql.includes('DELETE FROM records')) {
        data.records = data.records.filter(r => !(r.id === params[0] && r.userId === params[1]));
      }
      return {};
    }
  };
}

// 初始化数据库表结构
async function initDatabase() {
  const db = getDB();
  
  // 创建用户表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
  
  // 创建分类表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      parentId INTEGER NULL,
      userId INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);
  
  // 创建支付方式表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS paymentMethods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      userId INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);
  
  // 创建记录表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      categoryId INTEGER NOT NULL,
      paymentMethodId INTEGER NULL,
      date TEXT NOT NULL,
      remark TEXT NULL,
      userId INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (categoryId) REFERENCES categories(id),
      FOREIGN KEY (paymentMethodId) REFERENCES paymentMethods(id)
    );
  `);
}

// 用户相关操作
export async function createUser(username: string, password: string, email: string) {
  await initDatabase();
  const db = getDB();
  
  // 检查邮箱是否已存在
  const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser) {
    throw new Error('邮箱已被注册');
  }
  
  // 生成密码哈希
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAt = new Date().toISOString();
  
  // 创建新用户
  const result = await db.run(
    'INSERT INTO users (username, password, email, createdAt) VALUES (?, ?, ?, ?)',
    [username, hashedPassword, email, createdAt]
  );
  
  const newUser: User = {
    id: result.lastInsertRowid,
    username,
    password: hashedPassword,
    email,
    createdAt: new Date(createdAt)
  };
  
  // 为新用户创建默认分类和支付方式
  await createDefaultCategories(newUser.id);
  await createDefaultPaymentMethods(newUser.id);
  
  return newUser;
}

export async function getUserByEmail(email: string) {
  await initDatabase();
  const db = getDB();
  
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (user) {
    return {
      ...user,
      createdAt: new Date(user.createdAt)
    };
  }
  return null;
}

export async function getUserById(id: number) {
  await initDatabase();
  const db = getDB();
  
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
  if (user) {
    return {
      ...user,
      createdAt: new Date(user.createdAt)
    };
  }
  return null;
}

// 分类相关操作
export async function createDefaultCategories(userId: number) {
  await initDatabase();
  const db = getDB();
  
  const createdAt = new Date().toISOString();
  const defaultCategories = [
    // 收入分类
    { name: '工资', type: 'income', parentId: null },
    { name: '奖金', type: 'income', parentId: null },
    { name: '投资收益', type: 'income', parentId: null },
    { name: '其他收入', type: 'income', parentId: null },
    
    // 支出分类
    { name: '餐饮', type: 'expense', parentId: null },
    { name: '午餐', type: 'expense', parentId: null }, // 稍后更新
    { name: '晚餐', type: 'expense', parentId: null }, // 稍后更新
    { name: '外卖', type: 'expense', parentId: null }, // 稍后更新
    { name: '交通', type: 'expense', parentId: null },
    { name: '公交', type: 'expense', parentId: null }, // 稍后更新
    { name: '地铁', type: 'expense', parentId: null }, // 稍后更新
    { name: '打车', type: 'expense', parentId: null }, // 稍后更新
    { name: '购物', type: 'expense', parentId: null },
    { name: '服装', type: 'expense', parentId: null }, // 稍后更新
    { name: '日用品', type: 'expense', parentId: null }, // 稍后更新
    { name: '娱乐', type: 'expense', parentId: null },
    { name: '电影', type: 'expense', parentId: null }, // 稍后更新
    { name: '游戏', type: 'expense', parentId: null }, // 稍后更新
    { name: '其他支出', type: 'expense', parentId: null },
    
    // 转账分类
    { name: '银行卡转账', type: 'transfer', parentId: null },
    { name: '支付宝转账', type: 'transfer', parentId: null },
    { name: '微信转账', type: 'transfer', parentId: null }
  ];
  
  // 存储分类ID映射
  const categoryIds: number[] = [];
  
  // 首先插入所有分类
  for (const category of defaultCategories) {
    const result = await db.run(
      'INSERT INTO categories (name, type, parentId, userId, createdAt) VALUES (?, ?, ?, ?, ?)',
      [category.name, category.type, category.parentId, userId, createdAt]
    );
    categoryIds.push(result.lastInsertRowid);
  }
  
  // 更新子分类的parentId
  const updates = [
    { id: categoryIds[5], parentId: categoryIds[4] }, // 午餐 -> 餐饮
    { id: categoryIds[6], parentId: categoryIds[4] }, // 晚餐 -> 餐饮
    { id: categoryIds[7], parentId: categoryIds[4] }, // 外卖 -> 餐饮
    { id: categoryIds[9], parentId: categoryIds[8] }, // 公交 -> 交通
    { id: categoryIds[10], parentId: categoryIds[8] }, // 地铁 -> 交通
    { id: categoryIds[11], parentId: categoryIds[8] }, // 打车 -> 交通
    { id: categoryIds[13], parentId: categoryIds[12] }, // 服装 -> 购物
    { id: categoryIds[14], parentId: categoryIds[12] }, // 日用品 -> 购物
    { id: categoryIds[16], parentId: categoryIds[15] }, // 电影 -> 娱乐
    { id: categoryIds[17], parentId: categoryIds[15] } // 游戏 -> 娱乐
  ];
  
  for (const update of updates) {
    await db.run(
      'UPDATE categories SET parentId = ? WHERE id = ? AND userId = ?',
      [update.parentId, update.id, userId]
    );
  }
}

export async function getCategoriesByUserId(userId: number) {
  await initDatabase();
  const db = getDB();
  
  const categories = await db.all('SELECT * FROM categories WHERE userId = ?', [userId]);
  return categories.map(cat => ({
    ...cat,
    createdAt: new Date(cat.createdAt)
  }));
}

export async function createCategory(name: string, type: string, parentId: number | null, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const createdAt = new Date().toISOString();
  const result = await db.run(
    'INSERT INTO categories (name, type, parentId, userId, createdAt) VALUES (?, ?, ?, ?, ?)',
    [name, type, parentId, userId, createdAt]
  );
  
  return {
    id: result.lastInsertRowid,
    name,
    type,
    parentId,
    userId,
    createdAt: new Date(createdAt)
  };
}

export async function updateCategory(id: number, name: string, parentId: number | null, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const category = await db.get('SELECT * FROM categories WHERE id = ? AND userId = ?', [id, userId]);
  if (!category) {
    throw new Error('分类不存在');
  }
  
  await db.run(
    'UPDATE categories SET name = ?, parentId = ? WHERE id = ? AND userId = ?',
    [name, parentId, id, userId]
  );
  
  return {
    ...category,
    name,
    parentId,
    createdAt: new Date(category.createdAt)
  };
}

export async function deleteCategory(id: number, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const category = await db.get('SELECT * FROM categories WHERE id = ? AND userId = ?', [id, userId]);
  if (!category) {
    throw new Error('分类不存在');
  }
  
  await db.run('DELETE FROM categories WHERE id = ? AND userId = ?', [id, userId]);
  return true;
}

// 支付方式相关操作
export async function createDefaultPaymentMethods(userId: number) {
  await initDatabase();
  const db = getDB();
  
  const createdAt = new Date().toISOString();
  const defaultPaymentMethods = ['现金', '信用卡', '支付宝', '微信', '银行卡'];
  
  for (const name of defaultPaymentMethods) {
    await db.run(
      'INSERT INTO paymentMethods (name, userId, createdAt) VALUES (?, ?, ?)',
      [name, userId, createdAt]
    );
  }
}

export async function getPaymentMethodsByUserId(userId: number) {
  await initDatabase();
  const db = getDB();
  
  const methods = await db.all('SELECT * FROM paymentMethods WHERE userId = ?', [userId]);
  return methods.map(method => ({
    ...method,
    createdAt: new Date(method.createdAt)
  }));
}

export async function createPaymentMethod(name: string, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const createdAt = new Date().toISOString();
  const result = await db.run(
    'INSERT INTO paymentMethods (name, userId, createdAt) VALUES (?, ?, ?)',
    [name, userId, createdAt]
  );
  
  return {
    id: result.lastInsertRowid,
    name,
    userId,
    createdAt: new Date(createdAt)
  };
}

export async function updatePaymentMethod(id: number, name: string, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const method = await db.get('SELECT * FROM paymentMethods WHERE id = ? AND userId = ?', [id, userId]);
  if (!method) {
    throw new Error('支付方式不存在');
  }
  
  await db.run(
    'UPDATE paymentMethods SET name = ? WHERE id = ? AND userId = ?',
    [name, id, userId]
  );
  
  return {
    ...method,
    name,
    createdAt: new Date(method.createdAt)
  };
}

export async function deletePaymentMethod(id: number, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const method = await db.get('SELECT * FROM paymentMethods WHERE id = ? AND userId = ?', [id, userId]);
  if (!method) {
    throw new Error('支付方式不存在');
  }
  
  await db.run('DELETE FROM paymentMethods WHERE id = ? AND userId = ?', [id, userId]);
  return true;
}

// 记录相关操作
export async function getRecordsByUserId(userId: number) {
  await initDatabase();
  const db = getDB();
  
  const records = await db.all(
    'SELECT * FROM records WHERE userId = ? ORDER BY date DESC',
    [userId]
  );
  return records.map(record => ({
    ...record,
    date: new Date(record.date),
    createdAt: new Date(record.createdAt)
  }));
}

export async function createRecord(type: string, amount: number, categoryId: number, paymentMethodId: number | null, date: Date, remark: string | null, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const dateStr = date.toISOString();
  const createdAt = new Date().toISOString();
  
  const result = await db.run(
    'INSERT INTO records (type, amount, categoryId, paymentMethodId, date, remark, userId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [type, amount, categoryId, paymentMethodId, dateStr, remark, userId, createdAt]
  );
  
  return {
    id: result.lastInsertRowid,
    type,
    amount,
    categoryId,
    paymentMethodId,
    date,
    remark,
    userId,
    createdAt: new Date(createdAt)
  };
}

export async function updateRecord(id: number, type: string, amount: number, categoryId: number, paymentMethodId: number | null, date: Date, remark: string | null, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const record = await db.get('SELECT * FROM records WHERE id = ? AND userId = ?', [id, userId]);
  if (!record) {
    throw new Error('记录不存在');
  }
  
  const dateStr = date.toISOString();
  
  await db.run(
    'UPDATE records SET type = ?, amount = ?, categoryId = ?, paymentMethodId = ?, date = ?, remark = ? WHERE id = ? AND userId = ?',
    [type, amount, categoryId, paymentMethodId, dateStr, remark, id, userId]
  );
  
  return {
    ...record,
    type,
    amount,
    categoryId,
    paymentMethodId,
    date,
    remark,
    createdAt: new Date(record.createdAt)
  };
}

export async function deleteRecord(id: number, userId: number) {
  await initDatabase();
  const db = getDB();
  
  const record = await db.get('SELECT * FROM records WHERE id = ? AND userId = ?', [id, userId]);
  if (!record) {
    throw new Error('记录不存在');
  }
  
  await db.run('DELETE FROM records WHERE id = ? AND userId = ?', [id, userId]);
  return true;
}

// 验证密码
export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// 更新用户信息
export async function updateUser(id: number, username?: string, password?: string) {
  await initDatabase();
  const db = getDB();
  
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
  if (!user) {
    throw new Error('用户不存在');
  }
  
  if (username) {
    await db.run('UPDATE users SET username = ? WHERE id = ?', [username, id]);
    user.username = username;
  }
  
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
    user.password = hashedPassword;
  }
  
  return {
    ...user,
    createdAt: new Date(user.createdAt)
  };
}

// 导入数据
export async function importData(userId: number, data: { categories?: any[], paymentMethods?: any[], records?: any[] }) {
  await initDatabase();
  const db = getDB();
  
  // 先清空用户现有的数据
  await db.run('DELETE FROM categories WHERE userId = ?', [userId]);
  await db.run('DELETE FROM paymentMethods WHERE userId = ?', [userId]);
  await db.run('DELETE FROM records WHERE userId = ?', [userId]);
  
  // 创建ID映射
  const categoryIdMap: Record<number, number> = {};
  const paymentMethodIdMap: Record<number, number> = {};
  const createdAt = new Date().toISOString();
  
  // 导入分类
  if (data.categories && Array.isArray(data.categories)) {
    // 首先插入所有分类
    for (const category of data.categories) {
      const result = await db.run(
        'INSERT INTO categories (name, type, parentId, userId, createdAt) VALUES (?, ?, ?, ?, ?)',
        [category.name, category.type, category.parentId, userId, createdAt]
      );
      categoryIdMap[category.id] = result.lastInsertRowid;
    }
    
    // 更新子分类的parentId
    for (const category of data.categories) {
      if (category.parentId !== null) {
        const newParentId = categoryIdMap[category.parentId] || null;
        await db.run(
          'UPDATE categories SET parentId = ? WHERE id = ? AND userId = ?',
          [newParentId, categoryIdMap[category.id], userId]
        );
      }
    }
  }
  
  // 导入支付方式
  if (data.paymentMethods && Array.isArray(data.paymentMethods)) {
    for (const method of data.paymentMethods) {
      const result = await db.run(
        'INSERT INTO paymentMethods (name, userId, createdAt) VALUES (?, ?, ?)',
        [method.name, userId, createdAt]
      );
      paymentMethodIdMap[method.id] = result.lastInsertRowid;
    }
  }
  
  // 导入记录
  if (data.records && Array.isArray(data.records)) {
    for (const record of data.records) {
      const dateStr = new Date(record.date).toISOString();
      await db.run(
        'INSERT INTO records (type, amount, categoryId, paymentMethodId, date, remark, userId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          record.type,
          record.amount,
          categoryIdMap[record.categoryId] || record.categoryId,
          record.paymentMethodId ? (paymentMethodIdMap[record.paymentMethodId] || record.paymentMethodId) : null,
          dateStr,
          record.remark,
          userId,
          createdAt
        ]
      );
    }
  }
  
  return true;
}

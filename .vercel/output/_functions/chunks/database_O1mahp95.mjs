import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import bcrypt from 'bcryptjs';

const adapter = new JSONFile("db.json");
const defaultData = {
  users: [],
  categories: [],
  paymentMethods: [],
  records: []
};
const db = new Low(adapter, defaultData);
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
async function createUser(username, password, email) {
  await initDatabase();
  const existingUser = db.data.users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error("邮箱已被注册");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: db.data.users.length + 1,
    username,
    password: hashedPassword,
    email,
    createdAt: /* @__PURE__ */ new Date()
  };
  db.data.users.push(newUser);
  await db.write();
  await createDefaultCategories(newUser.id);
  await createDefaultPaymentMethods(newUser.id);
  return newUser;
}
async function getUserByEmail(email) {
  await initDatabase();
  return db.data.users.find((user) => user.email === email);
}
async function createDefaultCategories(userId) {
  await initDatabase();
  const defaultCategories = [
    // 收入分类
    { id: db.data.categories.length + 1, name: "工资", type: "income", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 2, name: "奖金", type: "income", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 3, name: "投资收益", type: "income", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 4, name: "其他收入", type: "income", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    // 支出分类
    { id: db.data.categories.length + 5, name: "餐饮", type: "expense", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 6, name: "午餐", type: "expense", parentId: db.data.categories.length + 5, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 7, name: "晚餐", type: "expense", parentId: db.data.categories.length + 5, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 8, name: "外卖", type: "expense", parentId: db.data.categories.length + 5, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 9, name: "交通", type: "expense", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 10, name: "公交", type: "expense", parentId: db.data.categories.length + 9, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 11, name: "地铁", type: "expense", parentId: db.data.categories.length + 9, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 12, name: "打车", type: "expense", parentId: db.data.categories.length + 9, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 13, name: "购物", type: "expense", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 14, name: "服装", type: "expense", parentId: db.data.categories.length + 13, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 15, name: "日用品", type: "expense", parentId: db.data.categories.length + 13, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 16, name: "娱乐", type: "expense", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 17, name: "电影", type: "expense", parentId: db.data.categories.length + 16, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 18, name: "游戏", type: "expense", parentId: db.data.categories.length + 16, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 19, name: "其他支出", type: "expense", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    // 转账分类
    { id: db.data.categories.length + 20, name: "银行卡转账", type: "transfer", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 21, name: "支付宝转账", type: "transfer", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.categories.length + 22, name: "微信转账", type: "transfer", parentId: null, userId, createdAt: /* @__PURE__ */ new Date() }
  ];
  db.data.categories.push(...defaultCategories);
  await db.write();
}
async function getCategoriesByUserId(userId) {
  await initDatabase();
  return db.data.categories.filter((category) => category.userId === userId);
}
async function createCategory(name, type, parentId, userId) {
  await initDatabase();
  const newCategory = {
    id: db.data.categories.length + 1,
    name,
    type,
    parentId,
    userId,
    createdAt: /* @__PURE__ */ new Date()
  };
  db.data.categories.push(newCategory);
  await db.write();
  return newCategory;
}
async function updateCategory(id, name, parentId, userId) {
  await initDatabase();
  const category = db.data.categories.find((c) => c.id === id && c.userId === userId);
  if (!category) {
    throw new Error("分类不存在");
  }
  category.name = name;
  category.parentId = parentId;
  await db.write();
  return category;
}
async function deleteCategory(id, userId) {
  await initDatabase();
  const index = db.data.categories.findIndex((c) => c.id === id && c.userId === userId);
  if (index === -1) {
    throw new Error("分类不存在");
  }
  db.data.categories.splice(index, 1);
  await db.write();
  return true;
}
async function createDefaultPaymentMethods(userId) {
  await initDatabase();
  const defaultPaymentMethods = [
    { id: db.data.paymentMethods.length + 1, name: "现金", userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.paymentMethods.length + 2, name: "信用卡", userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.paymentMethods.length + 3, name: "支付宝", userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.paymentMethods.length + 4, name: "微信", userId, createdAt: /* @__PURE__ */ new Date() },
    { id: db.data.paymentMethods.length + 5, name: "银行卡", userId, createdAt: /* @__PURE__ */ new Date() }
  ];
  db.data.paymentMethods.push(...defaultPaymentMethods);
  await db.write();
}
async function getPaymentMethodsByUserId(userId) {
  await initDatabase();
  return db.data.paymentMethods.filter((method) => method.userId === userId);
}
async function createPaymentMethod(name, userId) {
  await initDatabase();
  const newPaymentMethod = {
    id: db.data.paymentMethods.length + 1,
    name,
    userId,
    createdAt: /* @__PURE__ */ new Date()
  };
  db.data.paymentMethods.push(newPaymentMethod);
  await db.write();
  return newPaymentMethod;
}
async function updatePaymentMethod(id, name, userId) {
  await initDatabase();
  const method = db.data.paymentMethods.find((m) => m.id === id && m.userId === userId);
  if (!method) {
    throw new Error("支付方式不存在");
  }
  method.name = name;
  await db.write();
  return method;
}
async function deletePaymentMethod(id, userId) {
  await initDatabase();
  const index = db.data.paymentMethods.findIndex((m) => m.id === id && m.userId === userId);
  if (index === -1) {
    throw new Error("支付方式不存在");
  }
  db.data.paymentMethods.splice(index, 1);
  await db.write();
  return true;
}
async function getRecordsByUserId(userId) {
  await initDatabase();
  return db.data.records.filter((record) => record.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
async function createRecord(type, amount, categoryId, paymentMethodId, date, remark, userId) {
  await initDatabase();
  const newRecord = {
    id: db.data.records.length + 1,
    type,
    amount,
    categoryId,
    paymentMethodId,
    date,
    remark,
    userId,
    createdAt: /* @__PURE__ */ new Date()
  };
  db.data.records.push(newRecord);
  await db.write();
  return newRecord;
}
async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
async function updateUser(id, username, password) {
  await initDatabase();
  const user = db.data.users.find((u) => u.id === id);
  if (!user) {
    throw new Error("用户不存在");
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

export { getCategoriesByUserId as a, createCategory as b, createUser as c, deleteCategory as d, updateCategory as e, deletePaymentMethod as f, getUserByEmail as g, getPaymentMethodsByUserId as h, createPaymentMethod as i, updatePaymentMethod as j, getRecordsByUserId as k, createRecord as l, updateUser as u, verifyPassword as v };

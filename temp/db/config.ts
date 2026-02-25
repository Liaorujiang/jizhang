import { defineDb, defineTable, column } from 'astro:db';

// 定义用户表
export const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    created_at: column.date()
  }
});

// 定义分类表
export const Category = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    type: column.text(), // income, expense, transfer
    parent_id: column.number({ nullable: true }),
    created_at: column.date()
  }
});

// 定义支付方式表
export const PaymentMethod = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    icon: column.text({ nullable: true }),
    created_at: column.date()
  }
});

// 定义记账记录表
export const Transaction = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    user_id: column.number({ references: () => User.columns.id }),
    amount: column.number(),
    type: column.text(), // income, expense, transfer
    category_id: column.number({ references: () => Category.columns.id }),
    payment_method_id: column.number({ references: () => PaymentMethod.columns.id }),
    date: column.date(),
    time: column.text(),
    note: column.text({ nullable: true }),
    created_at: column.date()
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Category,
    PaymentMethod,
    Transaction
  }
});

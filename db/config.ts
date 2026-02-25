import { db, column } from '@astrojs/db';

export const User = db.table('User', {
  id: column.number({ primaryKey: true }),
  username: column.text(),
  password: column.text(),
  email: column.text(),
  createdAt: column.date({ default: new Date() })
});

export const Category = db.table('Category', {
  id: column.number({ primaryKey: true }),
  name: column.text(),
  type: column.text(), // income, expense
  parentId: column.number({ optional: true }),
  userId: column.number(),
  createdAt: column.date({ default: new Date() })
});

export const PaymentMethod = db.table('PaymentMethod', {
  id: column.number({ primaryKey: true }),
  name: column.text(),
  userId: column.number(),
  createdAt: column.date({ default: new Date() })
});

export const Record = db.table('Record', {
  id: column.number({ primaryKey: true }),
  type: column.text(), // income, expense, transfer
  amount: column.number(),
  categoryId: column.number(),
  paymentMethodId: column.number({ optional: true }),
  date: column.date(),
  remark: column.text({ optional: true }),
  userId: column.number(),
  createdAt: column.date({ default: new Date() })
});
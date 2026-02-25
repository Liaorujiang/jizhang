import { db } from '@astrojs/db';

export const User = db.table('User', {
  id: db.number({ primaryKey: true }),
  username: db.text(),
  password: db.text(),
  email: db.text(),
  createdAt: db.date({ default: new Date() })
});

export const Category = db.table('Category', {
  id: db.number({ primaryKey: true }),
  name: db.text(),
  type: db.text(), // income, expense
  parentId: db.number({ optional: true }),
  userId: db.number(),
  createdAt: db.date({ default: new Date() })
});

export const PaymentMethod = db.table('PaymentMethod', {
  id: db.number({ primaryKey: true }),
  name: db.text(),
  userId: db.number(),
  createdAt: db.date({ default: new Date() })
});

export const Record = db.table('Record', {
  id: db.number({ primaryKey: true }),
  type: db.text(), // income, expense, transfer
  amount: db.number(),
  categoryId: db.number(),
  paymentMethodId: db.number({ optional: true }),
  date: db.date(),
  remark: db.text({ optional: true }),
  userId: db.number(),
  createdAt: db.date({ default: new Date() })
});
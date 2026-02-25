// 检查本地存储中的数据
console.log('=== 检查本地存储数据 ===');

// 检查交易记录
const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
console.log('交易记录数量:', transactions.length);
console.log('交易记录数据:', transactions);

// 检查分类
const categories = JSON.parse(localStorage.getItem('categories') || '[]');
console.log('分类数量:', categories.length);
console.log('分类数据:', categories);

// 检查支付方式
const paymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
console.log('支付方式数量:', paymentMethods.length);
console.log('支付方式数据:', paymentMethods);

// 检查用户
const user = JSON.parse(localStorage.getItem('user') || 'null');
console.log('用户数据:', user);

// 检查用户列表
const users = JSON.parse(localStorage.getItem('users') || '[]');
console.log('用户列表数量:', users.length);
console.log('用户列表数据:', users);

console.log('=== 检查完成 ===');
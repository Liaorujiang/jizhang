// 测试数据脚本
// 用于检查和添加测试交易记录

// 检查当前的交易记录
const currentTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
console.log('当前交易记录数量:', currentTransactions.length);
console.log('当前交易记录:', currentTransactions);

// 检查用户状态
const user = JSON.parse(localStorage.getItem('user') || 'null');
console.log('用户状态:', user);

// 如果没有用户，创建一个测试用户
if (!user) {
  const testUser = {
    id: 1,
    name: '测试用户',
    email: 'test@example.com',
    password: 'password123'
  };
  localStorage.setItem('user', JSON.stringify(testUser));
  localStorage.setItem('users', JSON.stringify([testUser]));
  console.log('已创建测试用户:', testUser);
}

// 如果没有交易记录，添加一些测试记录
if (currentTransactions.length === 0) {
  const testTransactions = [
    {
      type: 'income',
      amount: 5000,
      category_id: 1,
      payment_method_id: 3,
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      note: '月工资',
      created_at: new Date().toISOString()
    },
    {
      type: 'expense',
      amount: 30,
      category_id: 5,
      payment_method_id: 4,
      date: new Date().toISOString().split('T')[0],
      time: '12:30',
      note: '午餐',
      created_at: new Date().toISOString()
    },
    {
      type: 'expense',
      amount: 10,
      category_id: 9,
      payment_method_id: 1,
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      note: '交通费',
      created_at: new Date().toISOString()
    }
  ];
  
  localStorage.setItem('transactions', JSON.stringify(testTransactions));
  console.log('已添加测试交易记录:', testTransactions);
}

// 检查分类数据
const categories = JSON.parse(localStorage.getItem('categories') || '[]');
console.log('分类数量:', categories.length);
if (categories.length === 0) {
  const defaultCategories = [
    { id: 1, name: '工资', type: 'income', parent_id: null },
    { id: 2, name: '奖金', type: 'income', parent_id: null },
    { id: 3, name: '投资收益', type: 'income', parent_id: null },
    { id: 4, name: '其他收入', type: 'income', parent_id: null },
    { id: 5, name: '餐饮', type: 'expense', parent_id: null },
    { id: 9, name: '交通', type: 'expense', parent_id: null },
    { id: 13, name: '购物', type: 'expense', parent_id: null },
    { id: 16, name: '娱乐', type: 'expense', parent_id: null },
    { id: 19, name: '其他支出', type: 'expense', parent_id: null },
    { id: 20, name: '银行卡转账', type: 'transfer', parent_id: null },
    { id: 21, name: '支付宝转账', type: 'transfer', parent_id: null },
    { id: 22, name: '微信转账', type: 'transfer', parent_id: null }
  ];
  localStorage.setItem('categories', JSON.stringify(defaultCategories));
  console.log('已添加默认分类:', defaultCategories);
}

// 检查支付方式数据
const paymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
console.log('支付方式数量:', paymentMethods.length);
if (paymentMethods.length === 0) {
  const defaultPaymentMethods = [
    { id: 1, name: '现金' },
    { id: 2, name: '信用卡' },
    { id: 3, name: '支付宝' },
    { id: 4, name: '微信' },
    { id: 5, name: '银行卡' }
  ];
  localStorage.setItem('paymentMethods', JSON.stringify(defaultPaymentMethods));
  console.log('已添加默认支付方式:', defaultPaymentMethods);
}

console.log('=== 测试完成 ===');
console.log('请刷新页面查看交易记录');

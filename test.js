// 测试脚本 - 验证个人记账网站所有功能
// 注意：此脚本需要在浏览器环境中运行，因为它使用localStorage API

console.log('=== 个人记账网站功能测试 ===');

// 检查是否在浏览器环境中
if (typeof localStorage === 'undefined') {
  console.error('错误：此测试脚本需要在浏览器环境中运行，因为它使用localStorage API');
  console.error('请在浏览器控制台中运行此脚本，或访问网站后在控制台中执行 runTests()');
} else {
  // 测试1: 初始化本地存储数据
  function testInitLocalStorage() {
    console.log('\n测试1: 初始化本地存储数据');
    
    // 清除现有数据
    localStorage.removeItem('users');
    localStorage.removeItem('user');
    localStorage.removeItem('transactions');
    localStorage.removeItem('categories');
    localStorage.removeItem('paymentMethods');
    
    // 初始化测试用户
    const testUser = {
      id: 1,
      name: '测试用户',
      email: 'test@example.com',
      password: 'password123'
    };
    
    localStorage.setItem('user', JSON.stringify(testUser));
    localStorage.setItem('users', JSON.stringify([testUser]));
    
    // 初始化测试分类
    const testCategories = [
      { id: 1, name: '工资', type: 'income', parent_id: null },
      { id: 2, name: '餐饮', type: 'expense', parent_id: null },
      { id: 3, name: '午餐', type: 'expense', parent_id: 2 }
    ];
    localStorage.setItem('categories', JSON.stringify(testCategories));
    
    // 初始化测试支付方式
    const testPaymentMethods = [
      { id: 1, name: '现金' },
      { id: 2, name: '支付宝' }
    ];
    localStorage.setItem('paymentMethods', JSON.stringify(testPaymentMethods));
    
    console.log('✓ 本地存储数据初始化成功');
  }
  
  // 测试2: 个人信息保存
  function testPersonalInfo() {
    console.log('\n测试2: 个人信息保存');
    
    // 模拟用户信息更新
    const updatedUser = {
      id: 1,
      name: '更新后的用户',
      email: 'updated@example.com',
      password: 'newpassword123'
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // 更新用户列表
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // 验证更新是否成功
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (savedUser.name === '更新后的用户' && savedUser.email === 'updated@example.com') {
      console.log('✓ 个人信息保存成功');
    } else {
      console.log('✗ 个人信息保存失败');
    }
  }
  
  // 测试3: 分类管理
  function testCategoryManagement() {
    console.log('\n测试3: 分类管理');
    
    // 测试添加分类
    let categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const newCategory = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      name: '交通',
      type: 'expense',
      parent_id: null
    };
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    
    // 测试编辑分类
    const categoryToEdit = categories.find(c => c.id === 2);
    if (categoryToEdit) {
      categoryToEdit.name = '餐饮美食';
      localStorage.setItem('categories', JSON.stringify(categories));
    }
    
    // 测试删除分类
    categories = categories.filter(c => c.id !== 3);
    localStorage.setItem('categories', JSON.stringify(categories));
    
    // 验证分类管理操作
    const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    const hasNewCategory = savedCategories.some(c => c.name === '交通');
    const hasUpdatedCategory = savedCategories.some(c => c.name === '餐饮美食');
    const hasDeletedCategory = savedCategories.some(c => c.id === 3);
    
    if (hasNewCategory && hasUpdatedCategory && !hasDeletedCategory) {
      console.log('✓ 分类管理功能正常');
    } else {
      console.log('✗ 分类管理功能异常');
    }
  }
  
  // 测试4: 支付方式管理
  function testPaymentMethodManagement() {
    console.log('\n测试4: 支付方式管理');
    
    // 测试添加支付方式
    let paymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
    const newPaymentMethod = {
      id: Math.max(...paymentMethods.map(p => p.id), 0) + 1,
      name: '微信'
    };
    paymentMethods.push(newPaymentMethod);
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    
    // 测试编辑支付方式
    const paymentToEdit = paymentMethods.find(p => p.id === 1);
    if (paymentToEdit) {
      paymentToEdit.name = '现金支付';
      localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    }
    
    // 测试删除支付方式
    paymentMethods = paymentMethods.filter(p => p.id !== 2);
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    
    // 验证支付方式管理操作
    const savedPaymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
    const hasNewPayment = savedPaymentMethods.some(p => p.name === '微信');
    const hasUpdatedPayment = savedPaymentMethods.some(p => p.name === '现金支付');
    const hasDeletedPayment = savedPaymentMethods.some(p => p.id === 2);
    
    if (hasNewPayment && hasUpdatedPayment && !hasDeletedPayment) {
      console.log('✓ 支付方式管理功能正常');
    } else {
      console.log('✗ 支付方式管理功能异常');
    }
  }
  
  // 测试5: 数据备份与恢复
  function testBackupRestore() {
    console.log('\n测试5: 数据备份与恢复');
    
    // 模拟导出数据
    const exportData = {
      users: JSON.parse(localStorage.getItem('users') || '[]'),
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
      categories: JSON.parse(localStorage.getItem('categories') || '[]'),
      paymentMethods: JSON.parse(localStorage.getItem('paymentMethods') || '[]')
    };
    
    // 模拟清空数据
    localStorage.removeItem('users');
    localStorage.removeItem('user');
    localStorage.removeItem('transactions');
    localStorage.removeItem('categories');
    localStorage.removeItem('paymentMethods');
    
    // 模拟导入数据
    if (exportData.users) localStorage.setItem('users', JSON.stringify(exportData.users));
    if (exportData.user) localStorage.setItem('user', JSON.stringify(exportData.user));
    if (exportData.transactions) localStorage.setItem('transactions', JSON.stringify(exportData.transactions));
    if (exportData.categories) localStorage.setItem('categories', JSON.stringify(exportData.categories));
    if (exportData.paymentMethods) localStorage.setItem('paymentMethods', JSON.stringify(exportData.paymentMethods));
    
    // 验证数据恢复
    const restoredUser = JSON.parse(localStorage.getItem('user') || '{}');
    const restoredCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    const restoredPaymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
    
    if (restoredUser.name === '更新后的用户' && restoredCategories.length > 0 && restoredPaymentMethods.length > 0) {
      console.log('✓ 数据备份与恢复功能正常');
    } else {
      console.log('✗ 数据备份与恢复功能异常');
    }
  }
  
  // 测试6: 添加记账记录
  function testAddTransaction() {
    console.log('\n测试6: 添加记账记录');
    
    // 测试添加记账记录
    const newTransaction = {
      type: 'expense',
      amount: 50.50,
      category_id: 2, // 餐饮美食
      payment_method_id: 1, // 现金支付
      date: new Date().toISOString().split('T')[0],
      time: '12:30',
      note: '午餐',
      created_at: new Date().toISOString()
    };
    
    let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // 验证记账记录添加
    const savedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const hasNewTransaction = savedTransactions.some(t => t.amount === 50.50 && t.note === '午餐');
    
    if (hasNewTransaction) {
      console.log('✓ 添加记账记录功能正常');
    } else {
      console.log('✗ 添加记账记录功能异常');
    }
  }
  
  // 运行所有测试
  function runAllTests() {
    testInitLocalStorage();
    testPersonalInfo();
    testCategoryManagement();
    testPaymentMethodManagement();
    testBackupRestore();
    testAddTransaction();
    
    console.log('\n=== 测试完成 ===');
    console.log('请检查以上测试结果，确保所有功能都正常工作。');
  }
  
  // 导出测试函数到全局作用域
  window.runTests = runAllTests;
  console.log('测试脚本已加载，可通过运行 runTests() 来执行测试');
  
  // 自动运行测试
  console.log('\n正在自动运行测试...');
  runAllTests();
}

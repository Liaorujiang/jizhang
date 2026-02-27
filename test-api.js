import fetch from 'node-fetch';

async function testLogin() {
  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: '12345678'
      })
    });

    const data = await response.json();
    console.log('登录测试结果:', data);
    
    // 测试其他功能
    if (data.success) {
      await testGetUserInfo(data.token);
      await testGetCategories(data.token);
      await testGetPaymentMethods(data.token);
      await testAddRecord(data.token);
      await testGetRecords(data.token);
    }
  } catch (error) {
    console.error('登录测试失败:', error);
  }
}

async function testGetUserInfo(token) {
  try {
    const response = await fetch('http://localhost:8000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log('获取用户信息测试结果:', data);
  } catch (error) {
    console.error('获取用户信息测试失败:', error);
  }
}

async function testGetCategories(token) {
  try {
    const response = await fetch('http://localhost:8000/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log('获取分类测试结果:', data);
  } catch (error) {
    console.error('获取分类测试失败:', error);
  }
}

async function testGetPaymentMethods(token) {
  try {
    const response = await fetch('http://localhost:8000/api/payment-methods', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log('获取支付方式测试结果:', data);
  } catch (error) {
    console.error('获取支付方式测试失败:', error);
  }
}

async function testAddRecord(token) {
  try {
    // 先获取分类和支付方式
    const categoriesResponse = await fetch('http://localhost:8000/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const categoriesData = await categoriesResponse.json();
    
    const paymentMethodsResponse = await fetch('http://localhost:8000/api/payment-methods', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const paymentMethodsData = await paymentMethodsResponse.json();
    
    if (categoriesData.success && paymentMethodsData.success && categoriesData.categories.length > 0 && paymentMethodsData.paymentMethods.length > 0) {
      const categoryId = categoriesData.categories[0].id;
      const paymentMethodId = paymentMethodsData.paymentMethods[0].id;
      
      const response = await fetch('http://localhost:8000/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'expense',
          amount: 100,
          category_id: categoryId,
          payment_method_id: paymentMethodId,
          date: new Date().toISOString(),
          remark: '测试记录'
        })
      });

      const data = await response.json();
      console.log('添加记录测试结果:', data);
    }
  } catch (error) {
    console.error('添加记录测试失败:', error);
  }
}

async function testGetRecords(token) {
  try {
    const response = await fetch('http://localhost:8000/api/records', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log('获取记录测试结果:', data);
  } catch (error) {
    console.error('获取记录测试失败:', error);
  }
}

testLogin();
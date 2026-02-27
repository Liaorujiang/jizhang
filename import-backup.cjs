const { JSONFile } = require('lowdb/node');
const { Low } = require('lowdb');
const adapter = new JSONFile('db.json');
const defaultData = {
  users: [],
  categories: [],
  paymentMethods: [],
  records: []
};
const db = new Low(adapter, defaultData);
const fs = require('fs');

async function importBackup() {
  try {
    // 读取数据库
    await db.read();
    
    // 找到用户465241367@qq.com的ID
    const user = db.data.users.find(u => u.email === '465241367@qq.com');
    if (!user) {
      console.error('未找到用户465241367@qq.com');
      return;
    }
    
    const userId = user.id;
    console.log('用户ID:', userId);
    
    // 读取备份文件
    const backupData = JSON.parse(fs.readFileSync('D:\\personal-finance-backup.json', 'utf8'));
    
    // 准备导入数据
    const importData = {
      categories: [],
      paymentMethods: [],
      records: []
    };
    
    // 转换分类数据
    if (backupData.categories) {
      importData.categories = backupData.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        type: cat.type,
        parentId: cat.parent_id,
        userId: userId,
        createdAt: new Date()
      }));
    }
    
    // 转换支付方式数据
    if (backupData.paymentMethods) {
      importData.paymentMethods = backupData.paymentMethods.map(method => ({
        id: method.id,
        name: method.name,
        userId: userId,
        createdAt: new Date()
      }));
    }
    
    // 转换交易记录数据
    if (backupData.transactions) {
      importData.records = backupData.transactions.map(trans => ({
        id: trans.id || Math.random(),
        type: trans.type,
        amount: trans.amount,
        categoryId: trans.category_id,
        paymentMethodId: trans.payment_method_id,
        date: new Date(`${trans.date} ${trans.time || '00:00'}`),
        remark: trans.note || null,
        userId: userId,
        createdAt: new Date()
      }));
    }
    
    // 清空用户现有数据
    db.data.categories = db.data.categories.filter(c => c.userId !== userId);
    db.data.paymentMethods = db.data.paymentMethods.filter(p => p.userId !== userId);
    db.data.records = db.data.records.filter(r => r.userId !== userId);
    
    // 创建ID映射
    const categoryIdMap = {};
    const paymentMethodIdMap = {};
    
    // 导入分类
    if (importData.categories.length > 0) {
      let currentCategoryId = db.data.categories.length + 1;
      const importedCategories = importData.categories.map(category => {
        const newId = currentCategoryId++;
        categoryIdMap[category.id] = newId;
        return {
          id: newId,
          name: category.name,
          type: category.type,
          parentId: category.parentId,
          userId: userId,
          createdAt: new Date()
        };
      });
      
      // 更新parentId
      for (const category of importedCategories) {
        if (category.parentId !== null) {
          category.parentId = categoryIdMap[category.parentId] || null;
        }
      }
      
      db.data.categories.push(...importedCategories);
    }
    
    // 导入支付方式
    if (importData.paymentMethods.length > 0) {
      let currentPaymentMethodId = db.data.paymentMethods.length + 1;
      const importedPaymentMethods = importData.paymentMethods.map(method => {
        const newId = currentPaymentMethodId++;
        paymentMethodIdMap[method.id] = newId;
        return {
          id: newId,
          name: method.name,
          userId: userId,
          createdAt: new Date()
        };
      });
      
      db.data.paymentMethods.push(...importedPaymentMethods);
    }
    
    // 导入记录
    if (importData.records.length > 0) {
      let currentRecordId = db.data.records.length + 1;
      const importedRecords = importData.records.map(record => ({
        id: currentRecordId++,
        type: record.type,
        amount: record.amount,
        categoryId: categoryIdMap[record.categoryId] || record.categoryId,
        paymentMethodId: record.paymentMethodId ? (paymentMethodIdMap[record.paymentMethodId] || record.paymentMethodId) : null,
        date: record.date,
        remark: record.remark,
        userId: userId,
        createdAt: new Date()
      }));
      
      db.data.records.push(...importedRecords);
    }
    
    // 写入数据库
    await db.write();
    console.log('数据导入成功！');
    console.log(`导入了 ${importData.categories.length} 个分类`);
    console.log(`导入了 ${importData.paymentMethods.length} 个支付方式`);
    console.log(`导入了 ${importData.records.length} 条记录`);
  } catch (error) {
    console.error('导入失败:', error);
  }
}

importBackup();

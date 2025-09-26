// app.js
App({
  globalData: {
    selectedDishes: [] // 存储选中的菜品
  },

  onLaunch() {
    // 小程序启动时从缓存加载选中的菜品
    try {
      const storedDishes = wx.getStorageSync('selectedDishes');
      if (storedDishes) {
        this.globalData.selectedDishes = storedDishes;
      }
    } catch (e) {
      console.error('加载缓存数据失败:', e);
    }
  },

  // 保存选中的菜品到缓存
  saveSelectedDishes() {
    try {
      wx.setStorageSync('selectedDishes', this.globalData.selectedDishes);
    } catch (e) {
      console.error('保存数据失败:', e);
    }
  },

  // 添加菜品到订单
  addDishToOrder(dish) {
    const selectedDishes = this.globalData.selectedDishes || [];
    const existingDishIndex = selectedDishes.findIndex(item => item.id === dish.id);
    
    if (existingDishIndex > -1) {
      // 如果已存在，增加数量
      selectedDishes[existingDishIndex].quantity += 1;
    } else {
      // 如果不存在，添加新菜品
      selectedDishes.push({
        ...dish,
        quantity: 1
      });
    }
    
    this.globalData.selectedDishes = selectedDishes;
    this.saveSelectedDishes();
    return selectedDishes;
  },

  // 从订单移除菜品
  removeDishFromOrder(dishId) {
    let selectedDishes = this.globalData.selectedDishes || [];
    selectedDishes = selectedDishes.filter(item => item.id !== dishId);
    this.globalData.selectedDishes = selectedDishes;
    this.saveSelectedDishes();
    return selectedDishes;
  },

  // 获取菜品选中状态
  isDishSelected(dishId) {
    const selectedDishes = this.globalData.selectedDishes || [];
    return selectedDishes.some(item => item.id === dishId);
  }
});
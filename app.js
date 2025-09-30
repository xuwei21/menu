// app.js
App({
  globalData: {
    selectedDishes: [], // 存储选中的菜品
    openid: null,
    // 配置商户信息
    merchantConfig: {
      openid: "o55Fz6zuMNKRX0ZSiQyF4E6CJU0Q", // 商户openid
      hasSubscribed: false // 订阅状态
    }
  },

  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-6g3eai443bef4bd0',
      traceUser: true
    })

    this.getUserInfo();

    // 小程序启动时从缓存加载选中的菜品
    try {
      const storedDishes = wx.getStorageSync('selectedDishes');
      if (storedDishes) {
        this.globalData.selectedDishes = storedDishes;
      }
      
      // 加载订阅状态
      const subscriptionStatus = wx.getStorageSync('merchantSubscription');
      if (subscriptionStatus) {
        this.globalData.merchantConfig.hasSubscribed = subscriptionStatus;
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

  // 保存订阅状态
  saveSubscriptionStatus(status) {
    try {
      this.globalData.merchantConfig.hasSubscribed = status;
      wx.setStorageSync('merchantSubscription', status);
    } catch (e) {
      console.error('保存订阅状态失败:', e);
    }
  },

  // 调用云函数的方法
  getUserInfo: function () {
    wx.cloud.callFunction({
      name: 'get',
      success: res => {
        console.log('云函数调用成功', res)
        console.log('openid:', res.result.openid)
        
        this.globalData.openid = res.result.openid;
        
        // 检查是否是商户且未订阅
        if (this.isMerchantUser() && !this.globalData.merchantConfig.hasSubscribed) {
          // 延迟触发订阅检查，确保页面已加载
          setTimeout(() => {
            this.triggerSubscriptionCheck();
          }, 1000);
        }
      },
      fail: err => {
        console.error('云函数调用失败', err)
      }
    })
  },

  // 检查是否是商户用户
  isMerchantUser() {
    return this.globalData.openid === this.globalData.merchantConfig.openid;
  },

  // 触发订阅检查
  triggerSubscriptionCheck() {
    // 通过全局事件或页面引用触发订阅弹窗
    if (this.subscriptionCallback) {
      this.subscriptionCallback();
    }
  },

  // 注册订阅回调
  onSubscriptionCheck(callback) {
    this.subscriptionCallback = callback;
  },

  // 添加菜品到订单
  addDishToOrder(dish) {
    const selectedDishes = this.globalData.selectedDishes || [];
    const existingDishIndex = selectedDishes.findIndex(item => item.id === dish.id);
    
    if (existingDishIndex > -1) {
      selectedDishes[existingDishIndex].quantity += 1;
    } else {
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
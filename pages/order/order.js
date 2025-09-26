// pages/order/order.js
Page({
  data: {
    scrollHeight: 0,
    selectedDishes: [],
    totalCount: 0,
    totalPrice: 0
  },

  onLoad() {
    this.calculateScrollHeight();
    this.loadSelectedDishes();
  },

  onShow() {
    this.loadSelectedDishes();
  },

  calculateScrollHeight() {
    const systemInfo = wx.getSystemInfoSync();
    const windowHeight = systemInfo.windowHeight;
    
    // 计算tabBar高度（约50px）
    const tabBarHeight = 50;
    const scrollHeight = windowHeight - tabBarHeight;

    this.setData({
      scrollHeight: scrollHeight
    });
  },

  loadSelectedDishes() {
    const app = getApp();
    const selectedDishes = app.globalData.selectedDishes || [];
    
    let totalCount = 0;
    let totalPrice = 0;
    
    selectedDishes.forEach(dish => {
      totalCount += dish.quantity;
      totalPrice += dish.price * dish.quantity;
    });

    this.setData({
      selectedDishes: selectedDishes,
      totalCount: totalCount,
      totalPrice: totalPrice.toFixed(2)
    });
  },

  increaseQuantity(e) {
    const dishId = e.currentTarget.dataset.id;
    const app = getApp();
    const selectedDishes = app.globalData.selectedDishes || [];
    
    const dishIndex = selectedDishes.findIndex(dish => dish.id === dishId);
    if (dishIndex > -1) {
      selectedDishes[dishIndex].quantity += 1;
      app.globalData.selectedDishes = selectedDishes;
      app.saveSelectedDishes();
      this.loadSelectedDishes();
    }
  },

  decreaseQuantity(e) {
    const dishId = e.currentTarget.dataset.id;
    const app = getApp();
    let selectedDishes = app.globalData.selectedDishes || [];
    
    const dishIndex = selectedDishes.findIndex(dish => dish.id === dishId);
    if (dishIndex > -1) {
      if (selectedDishes[dishIndex].quantity > 1) {
        selectedDishes[dishIndex].quantity -= 1;
      } else {
        selectedDishes.splice(dishIndex, 1);
      }
      app.globalData.selectedDishes = selectedDishes;
      app.saveSelectedDishes();
      this.loadSelectedDishes();
    }
  },

  goToMenu() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  noop() {
    // 空方法，防止事件冒泡
  }
});
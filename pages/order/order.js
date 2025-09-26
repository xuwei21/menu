// pages/order/order.js
Page({
  data: {
    scrollHeight: 0,
    selectedDishes: [],
    totalCount: 0,
    totalPrice: 0,
    footerHeight: 120 // 预估底部栏高度(rpx)，可根据实际调整
  },

  onLoad() {
    this.calculateScrollHeight();
    this.loadSelectedDishes();
    this.calculateFooterHeight();
  },

  onShow() {
    this.loadSelectedDishes();
  },

  calculateScrollHeight() {
    const systemInfo = wx.getSystemInfoSync();
    const windowHeight = systemInfo.windowHeight;
    
    // 计算tabBar高度（约50px）
    const tabBarHeight = 50;
    // 减去tabBar高度，scroll-view占据剩余空间
    const scrollHeight = windowHeight - tabBarHeight;

    this.setData({
      scrollHeight: scrollHeight
    });
  },

  calculateFooterHeight() {
    // 可以根据需要精确计算底部栏高度
    // 这里使用预估值，底部栏高度约为120rpx ≈ 60px
    const footerHeight = 60; // px
    this.setData({
      footerHeight: footerHeight
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
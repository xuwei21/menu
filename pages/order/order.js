// pages/order/order.js
Page({
  data: {
    nickName: '',
    scrollHeight: 0,
    selectedDishes: [],
    totalCount: 0,
    totalPrice: 0,
    footerHeight: 120, // 预估底部栏高度(rpx)，可根据实际调整
    isGettingUserInfo: false
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      });
    }
    this.calculateScrollHeight();
    this.loadSelectedDishes();
    this.calculateFooterHeight();
  },

  onShow() {
    this.loadSelectedDishes();
  },

  // 结算按钮点击事件
  onCheckout: function () {
    if (this.data.isGettingUserInfo) return;

    // 检查是否已有用户信息
    if (this.data.nickName && this.data.nickName !== '微信用户') {
      // 已有用户信息，直接结算
      this.processCheckout();
    } else {
      // 需要获取用户信息
      this.setData({
        isGettingUserInfo: true,
        showNicknameModal: true,
        tempNickName: this.data.nickName || '',
        tempAvatarUrl: this.data.avatarUrl || ''
      });
    }
  },

  // 选择头像
  onChooseAvatar: function (e) {
    const avatarUrl = e.detail.avatarUrl;
    this.setData({
      tempAvatarUrl: avatarUrl
    });
  },

  // 输入昵称
  onNicknameInput: function (e) {
    this.setData({
      tempNickName: e.detail.value
    });
  },

  // 确认用户信息
  confirmUserInfo: function () {
    if (!this.data.tempNickName.trim()) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }

    const userInfo = {
      nickName: this.data.tempNickName,
      avatarUrl: this.data.tempAvatarUrl
    };

    this.setData({
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      showNicknameModal: false,
      isGettingUserInfo: false
    });

    // 缓存用户信息
    wx.setStorageSync('userInfo', userInfo);

    // 继续结算流程
    this.processCheckout();
  },

  // 取消用户信息输入
  cancelUserInfo: function () {
    this.setData({
      showNicknameModal: false,
      isGettingUserInfo: false
    });
  },

  clearNickname: function () {
    this.setData({
      tempNickName: ''
    });
  },

  // 处理结算逻辑
  processCheckout: async function () {
    console.log('开始结算，用户昵称:', this.data.nickName)
    // var orderSummary = `用户: ${this.data.nickName}\n菜品数: ${this.data.totalCount}\n\n订单详情:\n`;
    // for (const dish of this.data.selectedDishes) {
    //   orderSummary += `- ${dish.name} x ${dish.quantity}\n`;
    // }
    // console.log(orderSummary);

    var dishesList = this.data.selectedDishes.map(dish => `${dish.name.replace(/\·/g, '')}`);
    console.log('菜品列表:', dishesList);

    wx.showLoading({
      title: '提交中...',
    });
    // 调用云函数发送订阅消息
    try {
      const result = await wx.cloud.callFunction({
        name: 'sendOrderMessage',
        data: {
          nickName: this.data.nickName,
          dishes: dishesList
        }
      });

      wx.hideLoading();

      if (result.result.success) {
        console.log('订阅消息发送成功');
      } else {
        console.error('订阅消息发送失败:', result.result.error);
        wx.showToast({
          title: 'Oops，通知发送失败~再试下呗',
          icon: 'none'
        });
        return;
      }
    } catch (error) {
      console.error('发送订阅消息失败:', error);
      wx.showToast({
          title: 'Oops，通知发送失败~再试下呗',
          icon: 'none'
        });
    }

    console.log('订单详情:', this.data.selectedDishes)

    // 跳转到结果页面
    wx.navigateTo({
      url: '/pages/result/result'
    });

    // 清空已选菜品
    const app = getApp();
    app.globalData.selectedDishes = [];
    app.saveSelectedDishes();
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
      totalPrice: totalPrice
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
// pages/index/index.js
Page({
  data: {
    scrollHeight: 0,
    banners: [],
    categories: [
      { id: 1, name: "招牌推荐", icon: "⭐" },
      { id: 2, name: "季节限定", icon: "🍂" },
      { id: 3, name: "小小海鲜", icon: "🐟" },
      { id: 4, name: "肉肉肉", icon: "🍖" },
      { id: 5, name: "时蔬", icon: "🥬" },
      { id: 6, name: "主食", icon: "🍚" },
      { id: 7, name: "甜品", icon: "🍰" }
    ],
    dishes: {},
    currentCategory: 1,
    currentDishes: [],
    showSubscriptionModal: false, // 控制订阅弹窗显示
    isMerchant: false // 是否是商户
  },

 async onLoad() {
    this.calculateScrollHeight();

    try {
      // 调用云函数获取菜单数据
      await this.getMenuData();
    } catch (error) {
      console.error('初始化菜单失败:', error);
      // 可以设置默认数据或显示错误提示
      wx.showToast({
        title: '菜单加载失败',
        icon: 'none',
        duration: 2000
      });
      // 设置加载完成，即使失败也显示页面
      this.setData({ isLoading: false });
    }

    this.initDishesSelection();

    // 注册订阅检查回调
    const app = getApp();
    app.onSubscriptionCheck(() => {
      this.checkAndShowSubscription();
    });
    
    // 立即检查一次
    setTimeout(() => {
      this.checkAndShowSubscription();
    }, 1500);
  },

    async getMenuData() {
    try {
      wx.showLoading({
        title: '加载菜单中...',
      });

      const result = await wx.cloud.callFunction({
        name: 'getMenu'
      });

      wx.hideLoading();

      if (result.result.success) {
        // 直接使用云函数处理好的数据结构
        const { banners, dishes } = result.result.data;
        
        // 更新数据
        this.setData({
          banners,
          dishes,
          isLoading: false,
          currentDishes: dishes[this.data.currentCategory] || []
        });
        
        console.log('菜单数据加载成功:', {
          banners: banners.length,
          dishes: Object.keys(dishes).reduce((acc, key) => {
            acc[key] = dishes[key].length;
            return acc;
          }, {})
        });
      } else {
        throw new Error(result.result.error || '获取菜单失败');
      }
    } catch (error) {
      wx.hideLoading();
      console.error('调用云函数失败:', error);
      throw error;
    }
  },

  onShow() {
    // 每次页面显示时更新菜品选择状态
    this.updateDishesSelection();
  },

  onReady() {
    this.calculateScrollHeight();
  },

    onResize() {
    // 窗口尺寸变化时重新计算高度
    this.calculateScrollHeight();
  },

  checkAndShowSubscription() {
    const app = getApp();
    const isMerchant = app.isMerchantUser();
    const hasSubscribed = app.globalData.merchantConfig.hasSubscribed;
    
    console.log('检查订阅状态:', { isMerchant, hasSubscribed });
    
    if (isMerchant) {
      this.setData({
        showSubscriptionModal: true,
        isMerchant: true
      });
    }
  },

    // 订阅消息
  async subscribeMessage() {
    try {
      
      const result = await wx.requestSubscribeMessage({
        tmplIds: ['Mc7v-gaKZhLb1MiNg4huhSxpBPPbjGn_ag8cG7KwEbA']
      });

      if (result['Mc7v-gaKZhLb1MiNg4huhSxpBPPbjGn_ag8cG7KwEbA'] === 'accept') {
        // 订阅成功
        const app = getApp();
        app.saveSubscriptionStatus(true);
        
        wx.showToast({
          title: '授权成功！',
          icon: 'success',
          duration: 2000
        });
        
        this.closeSubscriptionModal();
      } else {
        // 用户拒绝
        wx.showToast({
          title: '您拒绝了授权',
          icon: 'none',
          duration: 2000
        });
        this.closeSubscriptionModal();
      }
    } catch (error) {
      console.error('订阅失败:', error);
      wx.showToast({
        title: '授权失败',
        icon: 'none'
      });
    }
  },

  // 关闭订阅弹窗
  closeSubscriptionModal() {
    this.setData({
      showSubscriptionModal: false
    });
  },

  // 稍后提醒
  remindLater() {
    const app = getApp();
    // 设置24小时内不再提醒
    const remindTime = Date.now() + 24 * 60 * 60 * 1000;
    wx.setStorageSync('subscriptionRemindTime', remindTime);
    
    this.closeSubscriptionModal();
    
    wx.showToast({
      title: '已设置稍后提醒',
      icon: 'success',
      duration: 1500
    });
  },

  calculateScrollHeight() {
    const systemInfo = wx.getSystemInfoSync();
    const windowHeight = systemInfo.windowHeight;
    // 将rpx转换为px：400rpx = 400/750 * screenWidth
    const bannerHeight = 400 / 750 * systemInfo.screenWidth;
    const scrollHeight = windowHeight - bannerHeight;
    this.setData({ scrollHeight });
  },

  initDishesSelection() {
    // 为所有菜品添加selected属性
    const dishes = this.data.dishes;
    const app = getApp();

    Object.keys(dishes).forEach(categoryId => {
      dishes[categoryId].forEach(dish => {
        dish.selected = app.isDishSelected(dish.id);
      });
    });
    this.setData({ dishes });
  },

  updateDishesSelection() {
    const app = getApp();
    const dishes = this.data.dishes;

    // 更新选中状态
    Object.keys(dishes).forEach(categoryId => {
      dishes[categoryId].forEach(dish => {
        dish.selected = app.isDishSelected(dish.id);
      });
    });

    this.setData({
      dishes,
      currentDishes: dishes[this.data.currentCategory] || []
    });
  },

  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      currentCategory: categoryId,
      currentDishes: this.data.dishes[categoryId] || []
    });
  },

  toggleDishSelection(e) {
    // 使用catchtap后，这里不需要e.stopPropagation()
    const dish = e.currentTarget.dataset.dish;
    const app = getApp();

    if (!dish || !dish.id) {
      console.error('菜品数据异常:', dish);
      return;
    }

    if (app.isDishSelected(dish.id)) {
      // 如果已选中，则移除
      app.removeDishFromOrder(dish.id);
    } else {
      // 如果未选中，则添加
      app.addDishToOrder(dish);
    }

    // 更新当前页面的选中状态
    this.updateDishesSelection();

    // 显示操作反馈
    wx.showToast({
      title: app.isDishSelected(dish.id) ? '已添加到订单' : '已从订单移除',
      icon: 'success',
      duration: 1000
    });
  },

  goToDetail(e) {
    const dish = e.currentTarget.dataset.dish;
    wx.navigateTo({
      url: `/pages/detail/detail?dish=${JSON.stringify(dish)}`
    });
  },

    // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新');
    this.refreshMenuData().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 刷新菜单数据
  async refreshMenuData() {
    try {
      await this.getMenuData();
      wx.showToast({
        title: '菜单已更新',
        icon: 'success',
        duration: 1500
      });
    } catch (error) {
      console.error('刷新菜单失败:', error);
      wx.showToast({
        title: '更新失败',
        icon: 'none',
        duration: 1500
      });
    }
  }
});
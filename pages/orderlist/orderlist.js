// pages/order/orderlist.js
Page({
  data: {
    orders: [],
    loading: true,
    hasMore: true,
    page: 1,
    pageSize: 10
  },

  onLoad() {
    this.loadOrders();
  },

  onShow() {
    // 重新加载订单，确保数据最新
    this.setData({ 
      page: 1,
      orders: [],
      hasMore: true 
    });
    this.loadOrders();
  },

  onPullDownRefresh() {
    // 下拉刷新
    this.setData({ 
      page: 1,
      orders: [],
      hasMore: true 
    });
    this.loadOrders().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom() {
    // 上拉加载更多
    if (this.data.hasMore && !this.data.loading) {
      this.loadOrders(true);
    }
  },

  async loadOrders(isLoadMore = false) {

    // if (this.data.loading) return;
    console.log('开始调用云函数 getOrders...');
    this.setData({ loading: true });

    try {
      // 调用云函数获取订单数据
      const result = await wx.cloud.callFunction({
        name: 'getOrders', // 确保云函数名称正确
        data: {_id: null}
      });

      console.log('获取订单结果：', result);

      if (result.result.success) {
        const newOrders = result.result.data || [];
        
        if (isLoadMore) {
          // 加载更多
          const allOrders = this.data.orders.concat(newOrders);
          this.setData({ 
            orders: allOrders,
            page: this.data.page + 1,
            hasMore: newOrders.length === this.data.pageSize // 判断是否还有更多数据
          });
        } else {
          // 刷新或首次加载
          this.setData({ 
            orders: newOrders,
            page: 2, // 第一次加载后，下一页是第2页
            hasMore: newOrders.length === this.data.pageSize
          });
        }
      } else {
        wx.showToast({
          title: '获取订单失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('调用云函数失败：', error);
      wx.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },
  
    // 状态切换事件
  async onStatusChange(e) {
    const { order, index } = e.currentTarget.dataset;
    const newStatus = e.detail.value ? 'completed' : 'pending';
    console.log('切换订单状态：', order._id, '新状态：', newStatus);
    if (order.status === newStatus) {
      return; // 状态未改变，不做处理
    }

    // 显示加载提示
    wx.showLoading({
      title: '更新中...',
      mask: true
    });

    try {
      // 调用云函数更新订单状态
      const result = await wx.cloud.callFunction({
        name: 'updateOrder',
        data: {
          _id: order._id,
          status: newStatus
        }
      });

      if (result.result.success) {
        // 更新本地数据
        const updateKey = `orders[${index}].status`;
        this.setData({
          [updateKey]: newStatus
        });
        
        wx.showToast({
          title: '状态更新成功',
          icon: 'success'
        });
      } else {
        throw new Error(result.result.message || '更新失败');
      }
    } catch (error) {
      console.error('更新订单状态失败：', error);
      
      // 恢复switch状态
      const resetKey = `orders[${index}].status`;
      this.setData({
        [resetKey]: order.status
      });
      
      wx.showToast({
        title: '更新失败，请重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  navigateToDetail(e) {
    const order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: `/pages/order/orderDetail?orderId=${order._id}`
    });
  },

  // 重新加载订单
  onRetry() {
    this.setData({ 
      page: 1,
      orders: [],
      hasMore: true 
    });
    this.loadOrders();
  }
});
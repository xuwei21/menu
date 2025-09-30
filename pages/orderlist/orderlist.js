// pages/order/orderlist.js
Page({
  data: {
    orders: []
  },

  onLoad() {
    this.loadOrders();
  },

  onShow() {
    this.loadOrders();
  },

  loadOrders() {
    // 模拟订单数据
    const orders = [
      {
        "_id": "order1",
        "name": "梦猫人",
        "dishes": ["红烧肉", "清炒时蔬", "番茄鸡蛋汤"],
        "time": "2025-09-30 17:30",
        "status": "pending"
      },
      {
        "_id": "order2", 
        "name": "小猫咪",
        "dishes": ["糖醋里脊", "麻婆豆腐"],
        "time": "2025-09-29 12:15",
        "status": "completed"
      },
      {
        "_id": "order3",
        "name": "美食家",
        "dishes": ["宫保鸡丁", "酸辣土豆丝", "紫菜蛋花汤", "米饭", "宫保鸡丁", "酸辣土豆丝", "紫菜蛋花汤", "米饭"],
        "time": "2025-09-28 19:45",
        "status": "completed"
      }
    ];
    
    this.setData({ orders });
  },

  navigateToDetail(e) {
    const order = e.currentTarget.dataset.order;
    // wx.navigateTo({
    //   url: `/pages/detail/detail?order=${encodeURIComponent(JSON.stringify(order))}`
    // });
  }
});
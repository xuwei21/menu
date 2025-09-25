// pages/detail/detail.js
Page({
    data: {
      dish: {}
    },
  
    onLoad(options) {
      const dish = JSON.parse(options.dish);
      this.setData({ dish });
    },
  
    goBack() {
      wx.navigateBack();
    }
  });
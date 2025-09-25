// pages/index/index.js
Page({
    data: {
      scrollHeight: 0, // 滚动区域高度
      
      // 轮播图数据
      banners: [
        {
          id: 1,
          image: "https://pica.zhimg.com/v2-05450e2f09160a7d48f471cdebbb3dca_r.jpg" // 修改为实际存在的图片路径
        },
        {
          id: 2, 
          image: "https://pic4.zhimg.com/v2-08cab05d462bd5a580adcee4526bfc37_r.jpg"
        },
        {
          id: 3,
          image: "https://pic2.zhimg.com/v2-364dbc08a87930b789b2074085a38c05_r.jpg"
        }
      ],
      
      // 导航分类
      categories: [
        { id: 1, name: "招牌推荐", icon: "⭐" },
        { id: 2, name: "季节限定", icon: "🍂" },
        { id: 3, name: "小小海鲜", icon: "🐟" },
        { id: 4, name: "肉肉肉", icon: "🍖" },
        { id: 5, name: "时蔬", icon: "🥬" },
        { id: 6, name: "主食", icon: "🍚" },
        { id: 7, name: "甜品", icon: "🍰" }
      ],
      
      // 菜品数据
      dishes: {
        1: [
          {
            id: 1,
            name: "招牌红烧肉",
            image: "https://pica.zhimg.com/v2-05450e2f09160a7d48f471cdebbb3dca_r.jpg",
            description: "精选五花肉，慢火炖煮，入口即化",
            price: 68
          },
          {
            id: 2,
            name: "特色烤鱼",
            image: "https://pic4.zhimg.com/v2-08cab05d462bd5a580adcee4526bfc37_r.jpg", 
            description: "新鲜河鱼，秘制调料，香辣可口",
            price: 88
          }
        ],
        2: [
          {
            id: 3,
            name: "秋日蟹黄包",
            image: "https://pic2.zhimg.com/v2-364dbc08a87930b789b2074085a38c05_r.jpg",
            description: "秋季限定，蟹黄饱满，鲜美多汁",
            price: 128
          }
        ],
        3: [
          {
            id: 4, 
            name: "清蒸大闸蟹",
            image: "https://pica.zhimg.com/v2-05450e2f09160a7d48f471cdebbb3dca_r.jpg",
            description: "阳澄湖大闸蟹，原汁原味",
            price: 198
          }
        ],
        4: [
          {
            id: 5,
            name: "炭烤牛小排",
            image: "https://pic4.zhimg.com/v2-08cab05d462bd5a580adcee4526bfc37_r.jpg",
            description: "澳洲进口牛肉，炭火烤制",
            price: 158
          }
        ],
        5: [
            {
                id: 6,
                name: "葱香脆藕",
                image: "../../images/7.jpeg",
                description: "澳洲进口牛肉，炭火烤制",
                price: 158
              }
        ], // 时蔬类暂无菜品
        6: [
          {
            id: 7,
            name: "猫饭",
            image: "https://pic2.zhimg.com/v2-364dbc08a87930b789b2074085a38c05_r.jpg",
            description: "日式猫饭，柴鱼花飞舞",
            price: 28
          }
        ],
        7: []
      },
      
      currentCategory: 1, // 当前选中的分类
      currentDishes: []   // 当前分类下的菜品
    },
  
    onLoad() {
      // 计算滚动区域高度
      this.calculateScrollHeight();
      
      // 初始化显示第一个分类的菜品
      this.setData({
        currentDishes: this.data.dishes[this.data.currentCategory]
      });
    },
    
    onReady() {
      // 确保页面渲染完成后再次计算高度
      this.calculateScrollHeight();
    },
    
    // 计算滚动区域高度
    calculateScrollHeight() {
      const systemInfo = wx.getSystemInfoSync();
      const windowHeight = systemInfo.windowHeight;
      const bannerHeight = 400; // 轮播图高度400rpx，约200px
      
      // 计算可用高度（窗口高度 - 轮播图高度 - 可能的安全区域）
      const scrollHeight = windowHeight - bannerHeight / 2 - 20;
      
      this.setData({
        scrollHeight: scrollHeight
      });
    },
  
    // 切换分类
    switchCategory(e) {
      const categoryId = e.currentTarget.dataset.id;
      const dishes = this.data.dishes[categoryId] || [];
      
      this.setData({
        currentCategory: categoryId,
        currentDishes: dishes
      });
    },
  
    // 跳转到详情页
    goToDetail(e) {
      const dish = e.currentTarget.dataset.dish;
      wx.navigateTo({
        url: `/pages/detail/detail?dish=${JSON.stringify(dish)}`
      });
    }
  });
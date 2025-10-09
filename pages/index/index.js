// pages/index/index.js
Page({
  data: {
    scrollHeight: 0,
    banners: [
      {
        id: 1,
        name: "顾式·油爆罗氏虾",
        image: "https://i0.hdslb.com/bfs/new_dyn/d26f95421b1c60c56829149c5fd7eb9d513535578.jpg"
      },
      {
        id: 2,
        name: "鱿鱼二吃",
        image: "https://i0.hdslb.com/bfs/new_dyn/9abf42dcfefaf6f0c7ed21b029d91954513535578.png"
      },
      {
        id: 3,
        name: "杨枝甘露",
        image: "https://i0.hdslb.com/bfs/new_dyn/b89c67f63f4e101be08142b810469dac513535578.jpg"
      }
    ],
    categories: [
      { id: 1, name: "招牌推荐", icon: "⭐" },
      { id: 2, name: "季节限定", icon: "🍂" },
      { id: 3, name: "小小海鲜", icon: "🐟" },
      { id: 4, name: "肉肉肉", icon: "🍖" },
      { id: 5, name: "时蔬", icon: "🥬" },
      { id: 6, name: "主食", icon: "🍚" },
      { id: 7, name: "甜品", icon: "🍰" }
    ],
    dishes: {
      1: [
        {
          id: 101,
          name: "顾式·油爆罗氏虾",
          image: "https://i0.hdslb.com/bfs/new_dyn/d26f95421b1c60c56829149c5fd7eb9d513535578.jpg",
          description: "精选大只鲜活罗氏虾，以猛火快攻，瞬间锁住虾肉原鲜。金黄蒜蓉与醇厚黄油交融的馥郁香气，紧紧包裹于虾身，造就外壳焦香酥脆、虾肉弹嫩饱满的绝妙口感。每一口，皆是火焰艺术与味觉盛宴的激情碰撞。",
          price: 88
        },
        {
          id: 102,
          name: "奶香牛肋条",
          image: "https://i0.hdslb.com/bfs/new_dyn/4c19ce3fa3a67e3e570d8b9ab05f5cb6513535578.jpg",
          description: "甄选内蒙古草原顶级牛肋条，佐以浓郁奶香文火慢炖数小时。肉质酥烂而不散，油脂化为醇厚汁水，入口即化，奶香与肉香交织萦绕，呈现温暖丰腴的奢华享受。",
          price: 108
        }
      ],
      2: [
        {
          id: 201,
          name: "葱香脆藕",
          image: "https://i0.hdslb.com/bfs/new_dyn/3049ea6c993881ecb9b77c18b84149f1513535578.jpg",
          description: "严选西子湖当季九孔鲜藕，取其中段最为脆嫩部位。以现熬葱油轻巧拌制，最大程度保留藕片清甜本味。口感如玉瓷般清脆，淡雅葱香点睛，为一席佳肴带来清新风韵。",
          price: 28
        }
      ],
      3: [
        {
          id: 301,
          name: "葱油豉汁鲈鱼",
          image: "https://i0.hdslb.com/bfs/new_dyn/ca1cfc809e54b0c97d99040eb4a9923a513535578.jpg",
          description: "鲜活鲈鱼巧制孔雀开屏之姿，宴席佳品，赏心悦目。清蒸至恰熟，肉质如凝脂般滑嫩。点睛之笔在于一勺滚烫葱油，激发出特调豉汁的咸鲜本源。滋味层层递进，鲜美醇和，尽显粤式蒸功的优雅与精妙。",
          price: 68
        },
        {
          id: 302,
          name: "香炒蟹",
          image: "https://i0.hdslb.com/bfs/new_dyn/5ae5274e900c8618dafc2919e81b4a70513535578.jpg",
          description: "精选鲜活肥美梭子蟹，以传统猛火快炒技艺锁住蟹之原鲜。蟹黄丰腴如金，蟹肉饱满紧实，咸香汁水充分渗入蟹壳缝隙。出锅时镬气十足，香气奔放，是令人酣畅淋漓的海洋之味。",
          price: 88
        },
        {
          id: 303,
          name: "鱿鱼二吃",
          image: "https://i0.hdslb.com/bfs/new_dyn/9abf42dcfefaf6f0c7ed21b029d91954513535578.png",
          description: "一味两吃，尽显新鲜鱿鱼之妙。白灼之技凸显其天然弹滑与本真清甜；红烧之法则赋予其酱香浓郁、软糯入味的丰腴姿态。双拼对比，口感层次丰富，匠心独具。",
          price: 98
        }
      ],
      4: [
        {
          id: 401,
          name: "奶香牛肋条",
          image: "https://i0.hdslb.com/bfs/new_dyn/4c19ce3fa3a67e3e570d8b9ab05f5cb6513535578.jpg",
          description: "甄选内蒙古草原顶级牛肋条，佐以浓郁奶香文火慢炖数小时。肉质酥烂而不散，油脂化为醇厚汁水，入口即化，奶香与肉香交织萦绕，呈现温暖丰腴的奢华享受。",
          price: 108
        },
        {
          id: 402,
          name: "绍式葱烤鱼",
          image: "https://i0.hdslb.com/bfs/new_dyn/a11badc0fab05cbe4113e17cc7a41b9a513535578.jpg",
          description: "遵循古法绍式技艺，精选野生鲫鱼，与大量香葱经长时间慢火煨烤。葱段在高温下释放出深沉甜润的焦香，丝丝渗入鱼肉肌理。成品鱼骨酥软，鱼肉紧实入味，葱香浓郁深邃，是一道考验火候与耐心的传统风味。",
          price: 88
        }
      ],
      5: [
        {
          id: 501,
          name: "田园三色炒肉丝",
          image: "https://i0.hdslb.com/bfs/new_dyn/132381ab8d80f02e156f8188fff106d6513535578.jpg",
          description: "精选猪里脊切作匀称细丝，与翠绿豆角、甘甜透心红胡萝卜丝同炒。火候精准，肉丝滑嫩，蔬菜保持脆嫩口感与明艳色泽。一道家常菜肴，演绎出色彩缤纷、咸鲜爽口的视觉与味觉平衡。",
          price: 38
        },
        {
          id: 502,
          name: "葱香脆藕",
          image: "https://i0.hdslb.com/bfs/new_dyn/3049ea6c993881ecb9b77c18b84149f1513535578.jpg",
          description: "严选西子湖当季九孔鲜藕，取其中段最为脆嫩部位。以现熬葱油轻巧拌制，最大程度保留藕片清甜本味。口感如玉瓷般清脆，淡雅葱香点睛，为一席佳肴带来清新风韵。",
          price: 28
        },
        {
          id: 503,
          name: "粉糯贝贝南瓜",
          image: "https://i0.hdslb.com/bfs/new_dyn/3272f77735d0cf9e02e77eb2afa4690e513535578.jpg",
          description: "精选优质贝贝南瓜，其肉质致密，甜度高。经悉心蒸煮，南瓜呈现天然的金黄色泽与极致的粉糯口感。入口绵密香甜，栗香回味，温润养胃，乃一道兼具美味与食养价值的健康佳品。",
          price: 24
        }
      ],
      6: [
        {
          id: 601,
          name: "日式煎饺",
          image: "https://i0.hdslb.com/bfs/new_dyn/da33a6e1e10868727631059edb814603513535578.jpg",
          description: "秉承日式煎饺工艺，面皮手工擀制，薄而柔韧。内馅饱满多汁，于特制铁板间煎至底面形成完美金黄冰花脆壳。蘸取少许柑橘醋，口感酥脆与鲜嫩并存，滋味精巧平衡。",
          price: 24
        },
        {
          id: 602,
          name: "葱香手作花卷",
          image: "https://i0.hdslb.com/bfs/new_dyn/66fdb8160c16bb12cae74159a66d1c75513535578.jpg",
          description: "遵循古法手工成型，面体经过多次揉压与发酵，呈现如云朵般细腻柔软的质感。内里层次分明，点缀新鲜小葱，仅以薄盐引味，蒸制后散发淡淡咸香与葱香，是回归本真的温暖主食。",
          price: 8
        },
      ],
      7: [
        {
          id: 701,
          name: "杨枝甘露",
          image: "https://i0.hdslb.com/bfs/new_dyn/b89c67f63f4e101be08142b810469dac513535578.jpg",
          description: "复刻港式经典神韵，以吕宋芒的浓郁香甜为基底，融入西柚果粒的微酸清苦与西米的晶莹弹滑。椰浆与淡奶调和出顺滑绵密口感，甜而不腻，餐后一品，清凉润口，余韵悠长。",
          price: 18
        }
      ]
    },
    currentCategory: 1,
    currentDishes: [],
    showSubscriptionModal: false, // 控制订阅弹窗显示
    isMerchant: false // 是否是商户
  },

  onLoad() {
    this.calculateScrollHeight();
    this.initDishesSelection();
    this.setData({
      currentDishes: this.data.dishes[this.data.currentCategory]
    });
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

  onShow() {
    // 每次页面显示时更新菜品选择状态
    this.updateDishesSelection();
  },

  onReady() {
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
  }
});
// pages/index/index.js
Page({
    data: {
        scrollHeight: 0, // 滚动区域高度

        // 轮播图数据
        banners: [
            {
                image: "https://i0.hdslb.com/bfs/new_dyn/9abf42dcfefaf6f0c7ed21b029d91954513535578.png" // 修改为实际存在的图片路径
            },
            {
                image: "https://i0.hdslb.com/bfs/new_dyn/3049ea6c993881ecb9b77c18b84149f1513535578.jpg"
            },
            {
                image: "https://i0.hdslb.com/bfs/new_dyn/b89c67f63f4e101be08142b810469dac513535578.jpg"
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
                    "name": "奶香牛肋条",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/4c19ce3fa3a67e3e570d8b9ab05f5cb6513535578.jpg",
                    "description": "澳洲顶级牛肋条，奶香慢炖至酥烂，肉质入口即化，奶味醇厚，奢华享受。",
                    "price": 100
                },
                {
                    "name": "葱香脆藕",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/3049ea6c993881ecb9b77c18b84149f1513535578.jpg",
                    "description": "湖北九孔鲜藕，葱油轻拌，清脆爽口，淡雅葱香，开胃解腻。",
                    "price": 30
                }
            ],
            2: [ // 季节限定
                {
                    "name": "葱香脆藕",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/3049ea6c993881ecb9b77c18b84149f1513535578.jpg",
                    "description": "湖北九孔鲜藕，葱油轻拌，清脆爽口，淡雅葱香，开胃解腻。",
                    "price": 30
                }
            ],
            3: [ // 小小海鲜
                {
                    "name": "家烧鲈鱼",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/b335138ce7c3d4e03c2d703832c418f9513535578.png",
                    "description": "精选东海鲈鱼，传统家烧技法，肉质细腻鲜嫩，汤汁浓郁回甘，尽显江南风味。",
                    "price": 80
                },
                {
                    "name": "香炒蟹",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/5ae5274e900c8618dafc2919e81b4a70513535578.jpg",
                    "description": "梭子蟹蟹鲜活入馔，咸香爆炒，蟹黄丰腴，蟹肉饱满，香气扑鼻，令人回味无穷。",
                    "price": 120
                },
                {
                    "name": "鱿鱼二吃",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/9abf42dcfefaf6f0c7ed21b029d91954513535578.png",
                    "description": "新鲜鱿鱼双拼演绎，一吃白灼保留原鲜，一吃红烧诱人，口感层次丰富，创意十足。",
                    "price": 60
                }
            ],
            4: [ // 肉肉肉
                {
                    "name": "奶香牛肋条",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/4c19ce3fa3a67e3e570d8b9ab05f5cb6513535578.jpg",
                    "description": "澳洲顶级牛肋条，奶香慢炖至酥烂，肉质入口即化，奶味醇厚，奢华享受。",
                    "price": 100
                }
            ],
            5: [ // 时蔬
                {
                    "name": "葱香脆藕",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/3049ea6c993881ecb9b77c18b84149f1513535578.jpg",
                    "description": "湖北九孔鲜藕，葱油轻拌，清脆爽口，淡雅葱香，开胃解腻。",
                    "price": 25
                }
            ], 
            6: [ //主食
                {
                    "name": "日式煎饺",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/da33a6e1e10868727631059edb814603513535578.jpg",
                    "description": "日式手工煎饺，皮薄馅多，煎至金黄酥脆，搭配特制酱汁，精致开胃。",
                    "price": 40
                }
            ],
            7: [ // 甜品
                {
                    "name": "杨枝甘露",
                    "image": "https://i0.hdslb.com/bfs/new_dyn/b89c67f63f4e101be08142b810469dac513535578.jpg",
                    "description": "港式经典甜点，芒果西柚与西米完美融合，甜而不腻，清凉润口，餐后绝配。",
                    "price": 35
                }
            ]
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
// 云函数 getMenu
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const result = await db.collection('menu').get()
    
    // 在云函数中处理数据格式
    const processedData = processDataInCloud(result.data);
    
    return {
      success: true,      
      data: processedData
    }
  } catch (error) {
    console.error('获取菜单失败：', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// 在云函数中处理数据
function processDataInCloud(menuData) {
  const dishes = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
  const banners = [];

  menuData.forEach(item => {
    const dishItem = {
      id: item._id,
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price
    };

    // 处理 banner
    if (item.banner === "on") {
      banners.push({
        id: item._id,
        name: item.name,
        image: item.image
      });
    }

    // 根据 type 分类
    const type = parseInt(item.type);
    if (dishes[type]) {
      dishes[type].push(dishItem);
    }

    // 处理季节限定
    if (item.season && item.season.trim() !== "") {
      if (dishes[2]) {
        const exists = dishes[2].some(dish => dish.id === item._id);
        if (!exists) {
          dishes[2].push(dishItem);
        }
      }
    }
  });

  return {
    banners,
    dishes
  };
}
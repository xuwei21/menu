// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
const db = cloud.database()

exports.main = async (event, context) => {
  const { nickName, dishes } = event

  if (!nickName || !dishes) {
    return { success: false, message: '参数nickName和dishes不能为空' }
  }

  try {

    const result = await db.collection('orders').add({
      data: {
        nickName,
        dishes,
        time: formatDateTime(), // 服务端时间
      }
    })

    return {
      success: true,
      _id: result._id
    }
  } catch (error) {
    console.error('创建订单失败：', error)
    return {
      success: false,
      message: error.message
    }
  }

  function formatDateTime(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

}
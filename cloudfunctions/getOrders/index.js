// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
const db = cloud.database()

exports.main = async (event, context) => {
  const { _id } = event

  try {
    if (_id) {
      // 根据指定_id查询单个订单
      const result = await db.collection('orders').doc(_id).get()
      return {
        success: true,
        data: result.data
      }
    } else {
      // 全量获取所有订单
      const result = await db.collection('orders').get()
      return {
        success: true,
        data: result.data
      }
    }
  } catch (error) {
    console.error('查询订单失败：', error)
    return {
      success: false,
      message: error.message
    }
  }
}
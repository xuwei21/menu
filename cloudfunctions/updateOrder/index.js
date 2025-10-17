// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ 
  env: cloud.DYNAMIC_CURRENT_ENV 
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { _id, status } = event
  
  try {
    // 验证参数
    if (!_id) {
      return {
        success: false,
        message: '订单ID不能为空'
      }
    }
    
    if (!['pending', 'completed'].includes(status)) {
      return {
        success: false,
        message: '状态值不合法'
      }
    }

    // 更新订单状态
    const result = await db.collection('orders').doc(_id).update({
      data: {
        status: status
      }
    })

    if (result.stats.updated === 0) {
      return {
        success: false,
        message: '订单不存在或更新失败'
      }
    }

    return {
      success: true,
      message: '状态更新成功',
      data: result
    }
    
  } catch (error) {
    console.error('更新订单状态失败：', error)
    return {
      success: false,
      message: '服务器错误：' + error.message
    }
  }
}
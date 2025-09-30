const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  try {
    const { nickName, dishes } = event
    
    // 验证必要参数
    if (!dishes || !nickName) {
      return {
        success: false,
        error: '缺少必要参数：merchantOpenId, dishes, nickName'
      }
    }
    
    // 固定店名
    const storeName = "梦猫人の私厨"
    const orderTime = new Date().toLocaleString('zh-CN')
    
    // 格式化菜品，每个菜名换行
    const dishesText = Array.isArray(dishes) ? 
      dishes.join('\n') : 
      String(dishes)
    
    // 构建消息数据
    const messageData = {
      thing2: { value: storeName },           // 门店名称
      time7: { value: orderTime },            // 下单时间
      name8: { value: nickName },          // 联系人姓名
      thing6: { value: dishesText }           // 订单内容（换行显示）
    }
    
    console.log('发送消息数据:', messageData)
    
    // 发送订阅消息
    const result = await cloud.openapi.subscribeMessage.send({
      touser: "o55Fz6zuMNKRX0ZSiQyF4E6CJU0Q", // 替换为商户的openid
      template_id: 'Mc7v-gaKZhLb1MiNg4huhSxpBPPbjGn_ag8cG7KwEbA',
    //   page: 'pages/index/index', // 固定跳转到首页
      data: messageData
    })
    
    return {
      success: true,
      message: '订单通知发送成功'
    }
    
  } catch (error) {
    console.error('发送消息失败:', error)
    return {
      success: false,
      error: error.errMsg || error.message
    }
  }
}
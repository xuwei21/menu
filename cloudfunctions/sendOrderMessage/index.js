const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    try {
        console.log('接收到的参数:', event)
        const { nickName, dishes } = event

        // 验证必要参数
        if (!dishes || !nickName) {
            return {
                success: false,
                error: '缺少必要参数：merchantOpenId, dishes, nickName'
            }
        }

        // 固定店名
        const storeName = "梦猫人私厨"
        let dishesText =  Array.isArray(dishes) ? 
            dishes.map(dish => String(dish)) : [String(dishes)]
        dishesText = dishesText.join(' ')

        if (dishesText.length > 20) {
            dishesText = dishesText.slice(0, 17) + '...'
        }

        // 构建消息数据
        const messageData = {
            thing2: { value: storeName },           // 门店名称
            time7: { value: formatDateTime() },   // 下单时间
            name8: { value: nickName },          // 联系人姓名
            thing6: { value: dishesText }          // 订单内容
        }

        console.log('发送消息数据:', messageData)

        // 发送订阅消息
        const result = await cloud.openapi.subscribeMessage.send({
            touser: "o55Fz61H8Gon1HKzG4HthDAQQFzY", // 替换为商户的openid
            template_id: 'Mc7v-gaKZhLb1MiNg4huhSxpBPPbjGn_ag8cG7KwEbA',
            page: 'pages/orderlist/orderlist', // 固定跳转到订单管理页面
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
    
    function formatDateTime(date = new Date()) {
        const beijingTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    
        const year = beijingTime.getUTCFullYear();
        const month = String(beijingTime.getUTCMonth() + 1).padStart(2, '0');
        const day = String(beijingTime.getUTCDate()).padStart(2, '0');
        const hours = String(beijingTime.getUTCHours()).padStart(2, '0');
        const minutes = String(beijingTime.getUTCMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
}
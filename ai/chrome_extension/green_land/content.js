// content.js - 在网页中执行，修改背景颜色

// 监听来自popup.js的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // 检查消息类型
    if (request.action === 'changeBackground') {
        // 获取消息中指定的颜色，如果没有则使用默认的绿色
        const color = request.color || '#008000';
        
        // 修改document.body的背景色
        document.body.style.backgroundColor = color;
        
        // 为了更全面地修改背景色，也修改html元素的背景色
        document.documentElement.style.backgroundColor = color;
        
        // 发送响应，表示操作已完成
        sendResponse({ success: true, message: '背景色已修改为绿色' });
    }
});
// popup.js - 处理弹出窗口的交互逻辑

// 当DOM加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 获取按钮元素
    const changeColorButton = document.getElementById('changeColor');
    
    // 添加点击事件监听器
    changeColorButton.addEventListener('click', function() {
        // 获取当前活跃的标签页
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            // 向当前标签页发送消息，通知content script修改背景色
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeBackground', color: '#00FF00' });
        });
    });
});
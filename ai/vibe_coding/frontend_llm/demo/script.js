// DOM元素引用
const demoBtn = document.getElementById('demoBtn');
const resetBtn = document.getElementById('resetBtn');
const output = document.getElementById('output');
const demoForm = document.getElementById('demoForm');
const formResult = document.getElementById('formResult');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成');
    initEventListeners();
});

/**
 * 初始化事件监听器
 */
function initEventListeners() {
    // 演示按钮点击事件
    if (demoBtn) {
        demoBtn.addEventListener('click', handleDemoClick);
    }

    // 重置按钮点击事件
    if (resetBtn) {
        resetBtn.addEventListener('click', handleReset);
    }

    // 表单提交事件
    if (demoForm) {
        demoForm.addEventListener('submit', handleFormSubmit);
    }
}

/**
 * 处理演示按钮点击
 */
function handleDemoClick() {
    const timestamp = new Date().toLocaleString('zh-CN');
    const messages = [
        `✅ 按钮点击成功！`,
        `⏰ 时间: ${timestamp}`,
        `🎉 这是一个原生JavaScript演示`,
        `💡 你可以在这里添加任何功能`
    ];

    // 显示加载状态
    output.textContent = '加载中...';
    output.classList.add('loading');

    // 模拟异步操作
    setTimeout(() => {
        output.classList.remove('loading');
        output.innerHTML = messages.map(msg => `<div>${msg}</div>`).join('');
        output.style.display = 'block';
    }, 500);
}

/**
 * 处理重置操作
 */
function handleReset() {
    if (output) {
        output.textContent = '';
        output.style.display = 'block';
    }

    if (formResult) {
        formResult.classList.remove('show');
        formResult.textContent = '';
    }

    if (demoForm) {
        demoForm.reset();
    }

    console.log('已重置所有内容');
}

/**
 * 处理表单提交
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(demoForm);
    const name = formData.get('name');
    const message = formData.get('message');

    if (!name || !message) {
        showFormResult('请填写所有必填字段', 'error');
        return;
    }

    // 显示提交结果
    const resultHTML = `
        <strong>提交成功！</strong><br>
        <p><strong>姓名：</strong>${escapeHtml(name)}</p>
        <p><strong>消息：</strong>${escapeHtml(message)}</p>
        <p><small>提交时间: ${new Date().toLocaleString('zh-CN')}</small></p>
    `;

    showFormResult(resultHTML, 'success');

    // 重置表单
    demoForm.reset();

    console.log('表单提交:', { name, message });
}

/**
 * 显示表单结果
 */
function showFormResult(content, type = 'success') {
    if (!formResult) return;

    formResult.innerHTML = content;
    formResult.classList.add('show');

    // 根据类型设置样式
    if (type === 'error') {
        formResult.style.borderLeftColor = 'var(--danger-color)';
    } else {
        formResult.style.borderLeftColor = 'var(--success-color)';
    }

    // 3秒后自动隐藏
    setTimeout(() => {
        formResult.classList.remove('show');
    }, 3000);
}

/**
 * HTML转义，防止XSS攻击
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 工具函数：防抖
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 工具函数：节流
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出函数供其他脚本使用（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleDemoClick,
        handleReset,
        handleFormSubmit,
        escapeHtml,
        debounce,
        throttle
    };
}


// 主题管理服务
export function initThemeManager() {
    // 检查本地存储中是否有保存的主题偏好
    const savedTheme = localStorage.getItem('theme');
    
    // 检查系统偏好
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 如果有保存的主题偏好，使用它；否则使用系统偏好
    const initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');
    
    // 设置初始主题
    setTheme(initialTheme);
    
    // 添加主题切换按钮事件监听
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// 切换主题
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    
    // 保存主题偏好到本地存储
    localStorage.setItem('theme', newTheme);
    
    // 更新主题切换按钮图标
    updateThemeToggleIcon(newTheme);
}

// 设置主题
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // 更新主题切换按钮图标
    updateThemeToggleIcon(theme);
}

// 更新主题切换按钮图标
function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun" title="Switch to light mode"></i>' 
            : '<i class="fas fa-moon" title="Switch to dark mode"></i>';
    }
}
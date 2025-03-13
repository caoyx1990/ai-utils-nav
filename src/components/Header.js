export function renderHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    header.innerHTML = `
        <div class="container header-container">
            <div class="logo">AI导航</div>
            <ul class="nav-menu">
                <li><a href="#" class="active">首页</a></li>
                <li><a href="#">热门工具</a></li>
                <li><a href="#">最新上线</a></li>
                <li><a href="#">提交工具</a></li>
                <li><a href="#">关于我们</a></li>
            </ul>
            <div class="header-actions">
                <button id="themeToggle" class="theme-toggle" aria-label="切换暗黑模式">
                    <i class="fas fa-moon dark-icon"></i>
                    <i class="fas fa-sun light-icon"></i>
                </button>
            </div>
            <div class="auth-buttons">
                <button id="loginButton" class="btn btn-login">
                    <i class="fab fa-google"></i> 使用Google登录
                </button>
                <div id="userProfile" class="user-profile" style="display: none;">
                    <img id="userAvatar" src="" alt="用户头像" class="user-avatar">
                    <span id="userName" class="user-name"></span>
                    <button id="logoutButton" class="btn btn-logout">退出</button>
                </div>
            </div>
        </div>
    `;
}
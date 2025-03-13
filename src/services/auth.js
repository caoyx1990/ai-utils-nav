// Google OAuth 客户端ID - 你需要在Google Cloud Console创建
const GOOGLE_CLIENT_ID = '你的Google客户端ID';

// 初始化Google登录
export function initGoogleAuth() {
    // 加载Google API
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    script.onload = () => {
        // 初始化Google登录按钮
        setupGoogleLogin();
        
        // 检查用户是否已登录
        checkUserLoggedIn();
    };
}

// 设置Google登录
function setupGoogleLogin() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            // 初始化Google登录
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin
            });
            
            // 显示Google登录弹窗
            google.accounts.id.prompt();
        });
    }
    
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
}

// 处理Google登录回调
function handleGoogleLogin(response) {
    // 解析JWT令牌
    const payload = parseJwt(response.credential);
    
    // 保存用户信息到本地存储
    const user = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        token: response.credential
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    
    // 更新UI显示用户信息
    updateUserInterface(user);
}

// 处理退出登录
function handleLogout() {
    // 清除本地存储中的用户信息
    localStorage.removeItem('user');
    
    // 更新UI显示登录按钮
    document.getElementById('loginButton').style.display = 'flex';
    document.getElementById('userProfile').style.display = 'none';
}

// 检查用户是否已登录
function checkUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        // 更新UI显示用户信息
        updateUserInterface(user);
    }
}

// 更新UI显示用户信息
function updateUserInterface(user) {
    const loginButton = document.getElementById('loginButton');
    const userProfile = document.getElementById('userProfile');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    
    if (loginButton && userProfile && userAvatar && userName) {
        // 隐藏登录按钮，显示用户信息
        loginButton.style.display = 'none';
        userProfile.style.display = 'flex';
        
        // 设置用户头像和名称
        userAvatar.src = user.picture;
        userName.textContent = user.name;
    }
}

// 解析JWT令牌
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
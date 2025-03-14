import { t, getLanguage, setLanguage } from '../services/i18nService.js';

export function renderHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    const currentLang = getLanguage();
    const otherLang = currentLang === 'en' ? '中文' : 'English';
    
    header.innerHTML = `
        <div class="container header-container">
            <div class="logo">AI ${currentLang === 'en' ? 'Navigator' : '导航'}</div>
            <ul class="nav-menu">
                <li><a href="index.html" class="active">${t('home')}</a></li>
                <li><a href="#">${t('popularTools')}</a></li>
                <li><a href="#">${t('newTools')}</a></li>
                <li><a href="#">${t('submitTool')}</a></li>
                <li><a href="index.html?page=admin">${t('adminTools')}</a></li>
                <li><a href="#">${t('aboutUs')}</a></li>
            </ul>
            <div class="header-actions">
                <button id="languageToggle" class="lang-toggle">${otherLang}</button>
                <button id="themeToggle" class="theme-toggle" aria-label="Toggle dark mode">
                    <i class="fas fa-moon dark-icon"></i>
                    <i class="fas fa-sun light-icon"></i>
                </button>
            </div>
            <div class="auth-buttons">
                <button id="loginButton" class="btn btn-login">
                    <i class="fab fa-google"></i> ${t('loginWithGoogle')}
                </button>
                <div id="userProfile" class="user-profile" style="display: none;">
                    <img id="userAvatar" src="" alt="User Avatar" class="user-avatar">
                    <span id="userName" class="user-name"></span>
                    <button id="logoutButton" class="btn btn-logout">${t('logout')}</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listener for language toggle
    document.getElementById('languageToggle').addEventListener('click', () => {
        const newLang = getLanguage() === 'en' ? 'cn' : 'en';
        setLanguage(newLang);
        window.location.reload(); // Reload to apply changes
    });
}
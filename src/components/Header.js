import { t, getLanguage, setLanguage } from '../services/i18nService.js';

export function renderHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    // Force English as the default language
    setLanguage('en');
    const currentLang = 'en';
    
    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    header.innerHTML = `
        <div class="container header-container">
            <div class="logo">AI Navigator</div>
            <ul class="nav-menu">
                <li><a href="index.html" class="active">${t('home')}</a></li>
                <li><a href="#">${t('popularTools')}</a></li>
                <li><a href="#">${t('newTools')}</a></li>
                <li><a href="#">${t('submitTool')}</a></li>
                <li><a href="#">${t('aboutUs')}</a></li>
            </ul>
            <div class="header-actions">
                <!-- Language toggle button removed -->
                <button id="themeToggle" class="theme-toggle" aria-label="Toggle theme">
                    ${currentTheme === 'dark' 
                        ? '<i class="fas fa-sun" title="Switch to light mode"></i>' 
                        : '<i class="fas fa-moon" title="Switch to dark mode"></i>'}
                </button>
            </div>
        </div>
    `;
    
    // Language toggle event listener removed
}

/**
 * 
 * <div class="auth-buttons">
                <button id="loginButton" class="btn btn-login">
                    <i class="fab fa-google"></i> ${t('loginWithGoogle')}
                </button>
                <div id="userProfile" class="user-profile" style="display: none;">
                    <img id="userAvatar" src="" alt="User Avatar" class="user-avatar">
                    <span id="userName" class="user-name"></span>
                    <button id="logoutButton" class="btn btn-logout">${t('logout')}</button>
                </div>
            </div>
 */
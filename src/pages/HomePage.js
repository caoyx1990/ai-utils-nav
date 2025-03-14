import { t } from '../services/i18nService.js';

export function renderHomePage() {
    const main = document.getElementById('main');
    
    if (!main) return;
    
    main.innerHTML = `
        <section class="hero">
            <div class="container">
                <h1>${t('heroTitle')}</h1>
                <p>${t('heroSubtitle')}</p>
                <div class="search-container">
                    <input type="text" class="search-input" placeholder="${t('searchPlaceholder')}">
                    <button class="search-button"><i class="fas fa-search"></i></button>
                </div>
            </div>
        </section>
        
        <section class="tools-section">
            <div class="container">
                <div class="categories">
                    <div class="category-item active" data-category="all">${t('allCategories')}</div>
                    <div class="category-item" data-category="chat">${t('chat')}</div>
                    <div class="category-item" data-category="writing">${t('writing')}</div>
                    <div class="category-item" data-category="image">${t('image')}</div>
                    <div class="category-item" data-category="video">${t('video')}</div>
                    <div class="category-item" data-category="audio">${t('audio')}</div>
                    <div class="category-item" data-category="code">${t('code')}</div>
                    <div class="category-item" data-category="productivity">${t('productivity')}</div>
                </div>
                
                <div class="card-grid">
                    <!-- Cards will be dynamically generated -->
                </div>
            </div>
        </section>
    `;
}
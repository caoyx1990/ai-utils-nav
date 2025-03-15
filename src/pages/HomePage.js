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
                <div class="categories-wrapper">
                    <div class="categories">
                        <div class="category-item active" data-category="all">${t('allCategories')}</div>
                        <div class="category-item" data-category="chatbot">${t('chatbot')}</div>
                        <div class="category-item" data-category="writing">${t('writing')}</div>
                        <div class="category-item" data-category="productivity">${t('productivity')}</div>
                        <div class="category-item" data-category="image">${t('image')}</div>
                        <div class="category-item" data-category="design">${t('design')}</div>
                        <div class="category-item" data-category="creativity">${t('creativity')}</div>
                        <div class="category-item" data-category="marketing">${t('marketing')}</div>
                        <div class="category-item" data-category="video">${t('video')}</div>
                        <div class="category-item" data-category="audio">${t('audio')}</div>
                        <div class="category-item" data-category="voice">${t('voice')}</div>
                        <div class="category-item" data-category="transcription">${t('transcription')}</div>
                        <div class="category-item" data-category="meetings">${t('meetings')}</div>
                        <div class="category-item" data-category="presentation">${t('presentation')}</div>
                        <div class="category-item" data-category="search">${t('search')}</div>
                        <div class="category-item" data-category="research">${t('research')}</div>
                        <div class="category-item" data-category="development">${t('development')}</div>
                        <div class="category-item" data-category="machine-learning">${t('machineLearning')}</div>
                        <div class="category-item" data-category="api">${t('api')}</div>
                        <div class="category-item" data-category="safety">${t('safety')}</div>
                        <div class="category-item" data-category="education">${t('education')}</div>
                        <div class="category-item" data-category="organization">${t('organization')}</div>
                        <div class="category-item" data-category="social-media">${t('socialMedia')}</div>
                        <div class="category-item" data-category="editing">${t('editing')}</div>
                        <div class="category-item" data-category="multimodal">${t('multimodal')}</div>
                        <div class="category-item" data-category="language-models">${t('languageModels')}</div>
                    </div>
                    <button class="scroll-left"><i class="fas fa-chevron-left"></i></button>
                    <button class="scroll-right"><i class="fas fa-chevron-right"></i></button>
                </div>
                
                <div class="card-grid">
                    <!-- Cards will be dynamically generated -->
                </div>
            </div>
        </section>
    `;
    
    // Add scroll functionality for categories
    const categoriesWrapper = document.querySelector('.categories-wrapper');
    const categories = document.querySelector('.categories');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    
    if (categoriesWrapper && categories && scrollLeftBtn && scrollRightBtn) {
        // Scroll left button
        scrollLeftBtn.addEventListener('click', () => {
            categories.scrollBy({ left: -200, behavior: 'smooth' });
        });
        
        // Scroll right button
        scrollRightBtn.addEventListener('click', () => {
            categories.scrollBy({ left: 200, behavior: 'smooth' });
        });
        
        // Show/hide scroll buttons based on scroll position
        categories.addEventListener('scroll', () => {
            scrollLeftBtn.style.display = categories.scrollLeft > 0 ? 'flex' : 'none';
            scrollRightBtn.style.display = 
                categories.scrollLeft < (categories.scrollWidth - categories.clientWidth - 10) ? 'flex' : 'none';
        });
        
        // Initial check for scroll buttons
        setTimeout(() => {
            scrollLeftBtn.style.display = 'none';
            scrollRightBtn.style.display = 
                categories.scrollWidth > categories.clientWidth ? 'flex' : 'none';
        }, 100);
    }
}
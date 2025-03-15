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
                    <div class="search-input-wrapper">
                        <div class="search-source-dropdown">
                            <button class="search-source-selected">
                                <span>${t('searchSite')}</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="search-source-options">
                                <div class="search-source-option active" data-source="site">${t('searchSite')}</div>
                                <div class="search-source-option" data-source="google">Google</div>
                                <div class="search-source-option" data-source="bing">Bing</div>
                            </div>
                        </div>
                        <input type="text" class="search-input" placeholder="${t('searchPlaceholder')}">
                        <button class="search-button"><i class="fas fa-search"></i></button>
                    </div>
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
        
        <!-- Back to top button -->
        <button id="backToTopBtn" class="back-to-top-btn" title="Back to top">
            <i class="fas fa-arrow-up"></i>
        </button>
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
    
    // Add back to top button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    // Show button when user scrolls down 300px from the top
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add search source dropdown functionality
    const searchSourceDropdown = document.querySelector('.search-source-dropdown');
    const searchSourceSelected = document.querySelector('.search-source-selected');
    const searchSourceOptions = document.querySelector('.search-source-options');
    const searchSourceOptionsList = document.querySelectorAll('.search-source-option');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    let currentSearchSource = 'site';
    
    // Toggle dropdown when clicking on the selected option
    searchSourceSelected.addEventListener('click', (e) => {
        e.stopPropagation();
        searchSourceOptions.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        searchSourceOptions.classList.remove('show');
    });
    
    // Prevent dropdown from closing when clicking inside it
    searchSourceOptions.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Handle option selection
    searchSourceOptionsList.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            searchSourceOptionsList.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Update selected text
            searchSourceSelected.querySelector('span').textContent = option.textContent;
            
            // Update current search source
            currentSearchSource = option.dataset.source;
            
            // Update placeholder based on selected search source
            if (currentSearchSource === 'site') {
                searchInput.placeholder = t('searchPlaceholder');
            } else if (currentSearchSource === 'google') {
                searchInput.placeholder = t('searchGoogle');
            } else if (currentSearchSource === 'bing') {
                searchInput.placeholder = t('searchBing');
            }
            
            // Close dropdown
            searchSourceOptions.classList.remove('show');
        });
    });
    
    // Handle search button click
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (!query) return;
        
        if (currentSearchSource === 'site') {
            // Use the existing site search functionality
            // This is already handled in main.js
        } else if (currentSearchSource === 'google') {
            // Open Google search in a new tab
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' AI tool')}`, '_blank');
        } else if (currentSearchSource === 'bing') {
            // Open Bing search in a new tab
            window.open(`https://www.bing.com/search?q=${encodeURIComponent(query + ' AI tool')}`, '_blank');
        }
    });
    
    // Handle Enter key press in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}
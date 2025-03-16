import { loadAiTools } from '../data/aiTools.js';
import { categoriesMap } from '../data/categoriesMap.js';
import { t } from '../services/i18nService.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Get DOM elements
    const categoriesList = document.getElementById('categoriesList');
    const toolsGrid = document.getElementById('toolsGrid');
    const noResults = document.getElementById('noResults');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    
    // Load AI tools data
    const allTools = await loadAiTools();
    
    // Initialize with all tools
    let currentCategory = 'all';
    
    // Render categories
    renderCategories();
    
    // Render tools (initially all tools)
    renderTools(currentCategory);
    
    // Add event listeners for category scrolling
    scrollLeftBtn.addEventListener('click', () => {
        categoriesList.scrollBy({ left: -200, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        categoriesList.scrollBy({ left: 200, behavior: 'smooth' });
    });
    
    // Add event listener for back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Function to render categories
    function renderCategories() {
        // Create "All" category first
        const allCategoryItem = document.createElement('div');
        allCategoryItem.className = 'category-item active';
        allCategoryItem.dataset.category = 'all';
        allCategoryItem.textContent = t('allCategories');
        allCategoryItem.addEventListener('click', () => handleCategoryClick('all'));
        categoriesList.appendChild(allCategoryItem);
        
        // Add other categories
        Object.entries(categoriesMap).forEach(([categoryId, translationKey]) => {
            if (categoryId === 'all') return; // Skip "all" as we already added it
            
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            categoryItem.dataset.category = categoryId;
            categoryItem.textContent = t(translationKey);
            categoryItem.addEventListener('click', () => handleCategoryClick(categoryId));
            categoriesList.appendChild(categoryItem);
        });
    }
    
    // Function to handle category click
    function handleCategoryClick(categoryId) {
        // Update active category
        currentCategory = categoryId;
        
        // Update active class
        document.querySelectorAll('.category-item').forEach(item => {
            if (item.dataset.category === categoryId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Render tools for selected category
        renderTools(categoryId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Function to render tools
    function renderTools(categoryId) {
        // Clear previous tools
        toolsGrid.innerHTML = '';
        
        // Filter tools by category
        let filteredTools = allTools;
        if (categoryId !== 'all') {
            filteredTools = allTools.filter(tool => 
                tool.categories && tool.categories.includes(categoryId)
            );
        }
        
        // Show/hide no results message
        if (filteredTools.length === 0) {
            noResults.style.display = 'block';
            return;
        } else {
            noResults.style.display = 'none';
        }
        
        // Render each tool
        filteredTools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Create card HTML
            card.innerHTML = `
                <div class="card-image">
                    <img src="${tool.image || 'src/assets/images/placeholder.png'}" alt="${tool.name}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${tool.name}</h3>
                    <p class="card-description">${tool.description}</p>
                    <div class="card-tags">
                        ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="card-footer">
                        <a href="${tool.url}" class="btn" target="_blank" rel="noopener noreferrer">${t('visitSite')}</a>
                    </div>
                </div>
            `;
            
            toolsGrid.appendChild(card);
        });
    }
});
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { renderHomePage } from './pages/HomePage.js';
import { aiTools } from './data/aiTools.js';

// 初始化应用
function initApp() {
    renderHeader();
    renderHomePage();
    renderFooter();
    
    // 添加搜索功能
    setupSearch();
    
    // 添加分类筛选功能
    setupCategoryFilter();
}

// 设置搜索功能
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase().trim();
            filterTools(query);
        });
        
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase().trim();
                filterTools(query);
            }
        });
    }
}

// 设置分类筛选功能
function setupCategoryFilter() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有active类
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // 添加active类到当前点击的分类
            item.classList.add('active');
            
            const category = item.dataset.category;
            
            if (category === 'all') {
                renderToolCards(aiTools);
            } else {
                const filteredTools = aiTools.filter(tool => 
                    tool.categories.includes(category)
                );
                renderToolCards(filteredTools);
            }
        });
    });
}

// 根据搜索词筛选工具
function filterTools(query) {
    if (!query) {
        renderToolCards(aiTools);
        return;
    }
    
    const filteredTools = aiTools.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    renderToolCards(filteredTools);
}

// 渲染工具卡片
function renderToolCards(tools) {
    const cardGrid = document.querySelector('.card-grid');
    
    if (!cardGrid) return;
    
    if (tools.length === 0) {
        cardGrid.innerHTML = `<div class="no-results">没有找到匹配的AI工具，请尝试其他搜索词。</div>`;
        return;
    }
    
    cardGrid.innerHTML = tools.map(tool => `
        <div class="card">
            <div class="card-image">
                <img src="${tool.image}" alt="${tool.name}">
            </div>
            <div class="card-content">
                <h3 class="card-title">${tool.name}</h3>
                <p class="card-description">${tool.description}</p>
                <div class="card-tags">
                    ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${tool.url}" class="btn" target="_blank">访问网站</a>
            </div>
        </div>
    `).join('');
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);
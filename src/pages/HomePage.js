export function renderHomePage() {
    const main = document.getElementById('main');
    
    if (!main) return;
    
    main.innerHTML = `
        <section class="hero">
            <div class="container">
                <h1>发现最优质的AI工具和资源</h1>
                <p>我们精选全球领先的AI工具，帮助你提高效率、激发创意、解决问题</p>
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="搜索AI工具...">
                </div>
            </div>
        </section>
        
        <section class="container">
            <div class="category-nav">
                <ul class="category-list">
                    <li class="category-item active" data-category="all">全部</li>
                    <li class="category-item" data-category="chat">AI聊天</li>
                    <li class="category-item" data-category="writing">AI写作</li>
                    <li class="category-item" data-category="image">AI图像</li>
                    <li class="category-item" data-category="video">AI视频</li>
                    <li class="category-item" data-category="audio">AI音频</li>
                    <li class="category-item" data-category="code">AI编程</li>
                    <li class="category-item" data-category="productivity">效率工具</li>
                </ul>
            </div>
            
            <h2 class="section-title">精选AI工具</h2>
            <div class="card-grid">
                <!-- 卡片将通过JavaScript动态生成 -->
            </div>
        </section>
    `;
}
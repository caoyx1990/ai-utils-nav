export function renderFooter() {
    const footer = document.getElementById('footer');
    
    if (!footer) return;
    
    footer.innerHTML = `
        <div class="container">
            <div class="footer-container">
                <div class="footer-column">
                    <h3>AI导航</h3>
                    <p>发现和探索最优质的AI工具和资源</p>
                </div>
                <div class="footer-column">
                    <h3>快速链接</h3>
                    <ul class="footer-links">
                        <li><a href="#">首页</a></li>
                        <li><a href="#">热门工具</a></li>
                        <li><a href="#">最新上线</a></li>
                        <li><a href="#">提交工具</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>分类</h3>
                    <ul class="footer-links">
                        <li><a href="#">AI聊天</a></li>
                        <li><a href="#">AI写作</a></li>
                        <li><a href="#">AI图像</a></li>
                        <li><a href="#">AI视频</a></li>
                        <li><a href="#">AI音频</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>联系我们</h3>
                    <ul class="footer-links">
                        <li><a href="mailto:contact@ainavigation.com">contact@ainavigation.com</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">隐私政策</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 AI导航. 保留所有权利。</p>
            </div>
        </div>
    `;
}
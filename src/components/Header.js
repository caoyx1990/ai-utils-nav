export function renderHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    header.innerHTML = `
        <div class="container header-container">
            <div class="logo">AI导航</div>
            <ul class="nav-menu">
                <li><a href="#" class="active">首页</a></li>
                <li><a href="#">热门工具</a></li>
                <li><a href="#">最新上线</a></li>
                <li><a href="#">提交工具</a></li>
                <li><a href="#">关于我们</a></li>
            </ul>
        </div>
    `;
}
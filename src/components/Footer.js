import { t } from '../services/i18nService.js';

export function renderFooter() {
    const footer = document.getElementById('footer');
    
    if (!footer) return;
    
    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <div class="logo">AI ${t('home')}</div>
                </div>
                <div class="footer-links">
                    <a href="#">${t('privacyPolicy')}</a>
                    <a href="#">${t('termsOfService')}</a>
                    <a href="#">${t('contactUs')}</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>${t('copyright')}</p>
            </div>
        </div>
    `;
}
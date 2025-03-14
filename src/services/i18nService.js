import { translations } from '../i18n/translations.js';

// Default language
let currentLanguage = 'cn';

// Try to get language from localStorage or browser settings
export function initI18n() {
  const savedLang = localStorage.getItem('language');
  if (savedLang && (savedLang === 'en' || savedLang === 'cn')) {
    currentLanguage = savedLang;
  } else {
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      currentLanguage = 'en';
    }
    // Save to localStorage
    localStorage.setItem('language', currentLanguage);
  }
  
  // Update language toggle button if it exists
  updateLanguageToggle();
  
  // 添加语言类到body元素，方便CSS选择器使用
  document.body.setAttribute('data-language', currentLanguage);
  
  return currentLanguage;
}

// Get translation for a key
export function t(key, params = {}) {
  const langData = translations[currentLanguage];
  if (!langData || !langData[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  let text = langData[key];
  
  // 支持参数替换，例如 t('hello', {name: 'World'}) 会将 {name} 替换为 'World'
  if (Object.keys(params).length > 0) {
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`{${param}}`, 'g'), params[param]);
    });
  }
  
  return text;
}

// Change language
export function setLanguage(lang) {
  if (lang === 'en' || lang === 'cn') {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguageToggle();
    
    // 更新body的语言属性
    document.body.setAttribute('data-language', currentLanguage);
    
    return true;
  }
  return false;
}

// Get current language
export function getLanguage() {
  return currentLanguage;
}

// Update language toggle button
function updateLanguageToggle() {
  const langToggle = document.getElementById('languageToggle');
  if (langToggle) {
    langToggle.textContent = currentLanguage === 'en' ? '中文' : 'English';
  }
}

// 格式化日期
export function formatDate(date, format = 'short') {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  // 根据语言和格式返回不同的日期格式
  if (currentLanguage === 'en') {
    if (format === 'short') {
      return dateObj.toLocaleDateString('en-US');
    } else if (format === 'long') {
      return dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  } else {
    if (format === 'short') {
      return dateObj.toLocaleDateString('zh-CN');
    } else if (format === 'long') {
      return dateObj.toLocaleDateString('zh-CN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  }
  
  return date.toString();
}
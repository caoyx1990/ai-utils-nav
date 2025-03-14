import { getLanguage } from '../services/i18nService.js';

// 创建一个函数来加载AI工具数据
export async function loadAiTools() {
    try {
        // 首先尝试从localStorage加载
        const storedTools = localStorage.getItem('aiTools');
        if (storedTools) {
            return JSON.parse(storedTools);
        }
        
        // 获取当前语言
        const currentLang = getLanguage();
        
        // 根据当前语言加载相应的JSON文件
        const jsonFile = currentLang === 'en' ? 'src/data/aiTools.en.json' : 'src/data/aiTools.json';
        
        // 从JSON文件加载
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const aiTools = await response.json();
        
        // 保存到localStorage以便将来使用
        localStorage.setItem('aiTools', JSON.stringify(aiTools));
        
        return aiTools;
    } catch (error) {
        console.error('加载AI工具数据失败:', error);
        
        // 如果加载失败，返回硬编码的默认数据
        return aiTools;
    }
}

// 保留原始数据作为备份
export const aiTools = [
    {
        "id": 1,
        "name": "ChatGPT",
        "description": "OpenAI开发的强大对话AI模型，可以回答问题、创作内容、辅助编程等",
        "image": "src/assets/images/chatgpt.jpg",
        "url": "https://chat.openai.com",
        "categories": ["chat", "writing", "code"],
        "tags": ["对话", "写作", "编程", "问答"]
    }
    // ... 其他工具数据 ...
];
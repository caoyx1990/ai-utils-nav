import { getLanguage } from '../services/i18nService.js';

// Load AI tools data from category-based JSON files
export async function loadAiTools() {
    try {
        // First try to load from localStorage
        const storedTools = localStorage.getItem('aiTools');
        if (storedTools) {
            return JSON.parse(storedTools);
        }
        
        // Get current language
        const currentLang = getLanguage();
        const langSuffix = currentLang === 'en' ? '.en' : '';
        
        // Use the predefined categories list instead of trying to fetch directory listing
        // This avoids the 404 error on Vercel
        const categories = [
            '3D', 'All_Detector', 'Business', 'Chatbot', 'Code_IT', 
            'Design_Art', 'Education', 'Reatured', 'Image', 'Life_Assistant', 
            'Marketing', 'Other', 'Productivity', 'Prompt', 
            'Text_Writing', 'Video', 'Voice'
        ];
        
        // Load tools from each category file
        let allTools = [];
        
        for (const category of categories) {
            try {
                const response = await fetch(`/src/data/categories/${category}${langSuffix}.json`);
                if (response.ok) {
                    const categoryTools = await response.json();
                    // Add category information to each tool since it's not in the file anymore
                    categoryTools.forEach(tool => {
                        if (!tool.categories) {
                            tool.categories = [];
                        }
                        if (!tool.categories.includes(category)) {
                            tool.categories.push(category);
                        }
                    });
                    allTools = [...allTools, ...categoryTools];
                }
            } catch (error) {
                console.warn(`Failed to load category: ${category}`, error);
                // Continue with other categories if one fails
            }
        }
        
        // If no tools were loaded, return empty array or default backup
        if (allTools.length === 0) {
            console.warn('No tools loaded from category files');
            return [];
        }
        
        // Remove duplicates (in case a tool appears in multiple category files)
        const uniqueTools = [];
        const toolIds = new Set();
        
        for (const tool of allTools) {
            if (!toolIds.has(tool.id)) {
                toolIds.add(tool.id);
                uniqueTools.push(tool);
            } else {
                // If tool already exists, merge categories
                const existingTool = uniqueTools.find(t => t.id === tool.id);
                if (existingTool && tool.categories) {
                    tool.categories.forEach(category => {
                        if (!existingTool.categories.includes(category)) {
                            existingTool.categories.push(category);
                        }
                    });
                }
            }
        }
        
        // Save to localStorage for future use
        localStorage.setItem('aiTools', JSON.stringify(uniqueTools));
        
        return uniqueTools;
    } catch (error) {
        console.error('Failed to load AI tools data:', error);
        return [];
    }
}
/**
 * Node.js script to split existing tools data into category-based JSON files
 */

const fs = require('fs');
const path = require('path');

async function splitToolsByCategory() {
    try {
        // Load existing tools data
        const toolsPath = path.join(__dirname, '../src/data/aiTools.en.json');
        const toolsData = fs.readFileSync(toolsPath, 'utf8');
        const tools = JSON.parse(toolsData);
        
        // Create a map to store tools by category
        const categoriesMap = {};
        
        // Process each tool
        tools.forEach(tool => {
            tool.categories.forEach(category => {
                // Normalize category name for filename (replace spaces with hyphens, lowercase)
                const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
                
                // Initialize category array if it doesn't exist
                if (!categoriesMap[normalizedCategory]) {
                    categoriesMap[normalizedCategory] = [];
                }
                
                // Create a modified copy of the tool for this category
                const modifiedTool = { ...tool };
                
                // Remove the categories array since the filename indicates the category
                delete modifiedTool.categories;
                
                // Add creation date (current date)
                modifiedTool.create_date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
                
                // Remove "AI" from tags
                if (modifiedTool.tags && Array.isArray(modifiedTool.tags)) {
                    modifiedTool.tags = modifiedTool.tags.filter(tag => tag !== "AI");
                }
                
                // Add tool to this category
                categoriesMap[normalizedCategory].push(modifiedTool);
            });
        });
        
        // Output information about the split
        console.log(`Split ${tools.length} tools into ${Object.keys(categoriesMap).length} categories:`);
        
        // Ensure categories directory exists
        const categoriesDir = path.join(__dirname, '../src/data/categories');
        if (!fs.existsSync(categoriesDir)) {
            fs.mkdirSync(categoriesDir, { recursive: true });
        }
        
        // For each category, create a JSON file
        for (const [category, categoryTools] of Object.entries(categoriesMap)) {
            console.log(`${category}: ${categoryTools.length} tools`);
            
            // Write category file
            const filePath = path.join(categoriesDir, `${category}.en.json`);
            fs.writeFileSync(filePath, JSON.stringify(categoryTools, null, 2));
        }
        
        console.log('Category files created successfully!');
    } catch (error) {
        console.error('Error splitting tools by category:', error);
    }
}

// Run the function
splitToolsByCategory();
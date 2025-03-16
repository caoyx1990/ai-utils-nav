// Save AI tools data
export async function saveAiTools(tools) {
    try {
        // Save to localStorage
        localStorage.setItem('aiTools', JSON.stringify(tools));
        
        // In a real application, this would be an API request to save to the server
        // For example:
        /*
        const response = await fetch('/api/tools', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tools)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        */
        
        return true;
    } catch (error) {
        console.error('Failed to save AI tools data:', error);
        return false;
    }
}

// Add new tool
export async function addTool(tool) {
    try {
        // Get existing tools from localStorage
        const storedTools = localStorage.getItem('aiTools');
        const tools = storedTools ? JSON.parse(storedTools) : [];
        
        // Add new tool
        tool.id = Date.now(); // Use timestamp as ID
        tools.push(tool);
        
        // Save updated tool list
        await saveAiTools(tools);
        
        return tool;
    } catch (error) {
        console.error('Failed to add tool:', error);
        return null;
    }
}

// Rest of the file remains unchanged
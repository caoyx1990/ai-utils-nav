// 保存AI工具数据
export async function saveAiTools(tools) {
    try {
        // 保存到localStorage
        localStorage.setItem('aiTools', JSON.stringify(tools));
        
        // 在实际应用中，这里应该是一个API请求来保存到服务器
        // 例如：
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
        console.error('保存AI工具数据失败:', error);
        return false;
    }
}

// 添加新工具
export async function addTool(tool) {
    try {
        // 从localStorage获取现有工具
        const storedTools = localStorage.getItem('aiTools');
        const tools = storedTools ? JSON.parse(storedTools) : [];
        
        // 添加新工具
        tool.id = Date.now(); // 使用时间戳作为ID
        tools.push(tool);
        
        // 保存更新后的工具列表
        await saveAiTools(tools);
        
        return tool;
    } catch (error) {
        console.error('添加工具失败:', error);
        return null;
    }
}

// 更新工具
export async function updateTool(tool) {
    try {
        // 从localStorage获取现有工具
        const storedTools = localStorage.getItem('aiTools');
        const tools = storedTools ? JSON.parse(storedTools) : [];
        
        // 查找并更新工具
        const index = tools.findIndex(t => t.id === tool.id);
        if (index !== -1) {
            tools[index] = tool;
            
            // 保存更新后的工具列表
            await saveAiTools(tools);
            
            return tool;
        }
        
        throw new Error('工具不存在');
    } catch (error) {
        console.error('更新工具失败:', error);
        return null;
    }
}

// 删除工具
export async function deleteTool(id) {
    try {
        // 从localStorage获取现有工具
        const storedTools = localStorage.getItem('aiTools');
        const tools = storedTools ? JSON.parse(storedTools) : [];
        
        // 查找并删除工具
        const index = tools.findIndex(t => t.id === id);
        if (index !== -1) {
            tools.splice(index, 1);
            
            // 保存更新后的工具列表
            await saveAiTools(tools);
            
            return true;
        }
        
        throw new Error('工具不存在');
    } catch (error) {
        console.error('删除工具失败:', error);
        return false;
    }
}
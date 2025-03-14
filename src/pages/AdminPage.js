import { loadAiTools } from '../data/aiTools.js';
import { addTool, updateTool, deleteTool } from '../services/toolsService.js';
import { t } from '../services/i18nService.js';

export async function renderAdminPage() {
    const main = document.getElementById('main');
    
    if (!main) return;
    
    // Load AI tools data
    const aiTools = await loadAiTools();
    
    main.innerHTML = `
        <section class="admin-section">
            <div class="container">
                <h1 class="admin-title">${t('adminTitle')}</h1>
                <p class="admin-description">${t('adminDescription')}</p>
                
                <div class="admin-panel">
                    <div class="tools-list-panel">
                        <div class="panel-header">
                            <h2>${t('toolsList')}</h2>
                            <div class="search-container">
                                <input type="text" id="toolSearch" class="search-input" placeholder="${t('searchTools')}">
                            </div>
                        </div>
                        <div class="tools-list" id="toolsList">
                            ${renderToolsList(aiTools)}
                        </div>
                        <button id="addToolBtn" class="btn btn-primary">${t('addNewTool')}</button>
                    </div>
                    
                    <div class="tool-edit-panel" id="toolEditPanel">
                        <h2 id="editPanelTitle">${t('addNewTool')}</h2>
                        <form id="toolForm">
                            <input type="hidden" id="toolId" value="">
                            
                            <div class="form-group">
                                <label for="toolName">${t('toolName')}</label>
                                <input type="text" id="toolName" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="toolDescription">${t('toolDescription')}</label>
                                <textarea id="toolDescription" rows="4" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="toolImage">${t('toolImage')}</label>
                                <input type="text" id="toolImage" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="toolUrl">${t('toolUrl')}</label>
                                <input type="url" id="toolUrl" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="toolCategories">${t('toolCategories')}</label>
                                <input type="text" id="toolCategories" required>
                                <small>${t('categoriesHelp')}</small>
                            </div>
                            
                            <div class="form-group">
                                <label for="toolTags">${t('toolTags')}</label>
                                <input type="text" id="toolTags" required>
                                <small>${t('tagsHelp')}</small>
                            </div>
                            
                            <div class="form-actions">
                                <button type="button" id="cancelBtn" class="btn btn-secondary">${t('cancel')}</button>
                                <button type="submit" class="btn btn-primary">${t('save')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Add event listeners
    setupAdminEventListeners(aiTools);
}

function renderToolsList(tools) {
    if (tools.length === 0) {
        return `<div class="no-tools">${t('noToolsFound')}</div>`;
    }
    
    return tools.map(tool => `
        <div class="tool-item" data-id="${tool.id}">
            <div class="tool-info">
                <h3>${tool.name}</h3>
                <p>${tool.description.substring(0, 100)}${tool.description.length > 100 ? '...' : ''}</p>
            </div>
            <div class="tool-actions">
                <button class="btn btn-edit" data-id="${tool.id}">${t('editTool')}</button>
                <button class="btn btn-delete" data-id="${tool.id}">${t('deleteTool')}</button>
            </div>
        </div>
    `).join('');
}

function setupAdminEventListeners(aiTools) {
    const toolsList = document.getElementById('toolsList');
    const toolForm = document.getElementById('toolForm');
    const addToolBtn = document.getElementById('addToolBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const toolSearch = document.getElementById('toolSearch');
    
    // Add new tool button
    addToolBtn.addEventListener('click', () => {
        document.getElementById('editPanelTitle').textContent = t('addNewTool');
        toolForm.reset();
        document.getElementById('toolId').value = '';
    });
    
    // Cancel button
    cancelBtn.addEventListener('click', () => {
        toolForm.reset();
    });
    
    // Edit tool buttons
    toolsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            const toolId = parseInt(e.target.dataset.id);
            const tool = aiTools.find(t => t.id === toolId);
            
            if (tool) {
                document.getElementById('editPanelTitle').textContent = t('editTool');
                document.getElementById('toolId').value = tool.id;
                document.getElementById('toolName').value = tool.name;
                document.getElementById('toolDescription').value = tool.description;
                document.getElementById('toolImage').value = tool.image;
                document.getElementById('toolUrl').value = tool.url;
                document.getElementById('toolCategories').value = tool.categories.join(', ');
                document.getElementById('toolTags').value = tool.tags.join(', ');
            }
        } else if (e.target.classList.contains('btn-delete')) {
            const toolId = parseInt(e.target.dataset.id);
            if (confirm(t('confirmDelete'))) {
                handleDeleteTool(toolId, aiTools);
            }
        }
    });
    
    // Search tools
    toolSearch.addEventListener('input', () => {
        const searchTerm = toolSearch.value.toLowerCase();
        const filteredTools = aiTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) || 
            tool.description.toLowerCase().includes(searchTerm)
        );
        document.getElementById('toolsList').innerHTML = renderToolsList(filteredTools);
    });
    
    // Form submission
    toolForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSaveTool(toolForm, aiTools);
    });
}

async function handleSaveTool(form, aiTools) {
    const toolId = document.getElementById('toolId').value;
    const toolData = {
        name: document.getElementById('toolName').value,
        description: document.getElementById('toolDescription').value,
        image: document.getElementById('toolImage').value,
        url: document.getElementById('toolUrl').value,
        categories: document.getElementById('toolCategories').value.split(',').map(c => c.trim()),
        tags: document.getElementById('toolTags').value.split(',').map(t => t.trim())
    };
    
    if (toolId) {
        // Update existing tool
        toolData.id = parseInt(toolId);
        const updatedTool = await updateTool(toolData);
        if (updatedTool) {
            const index = aiTools.findIndex(t => t.id === updatedTool.id);
            if (index !== -1) {
                aiTools[index] = updatedTool;
            }
        }
    } else {
        // Add new tool
        const newTool = await addTool(toolData);
        if (newTool) {
            aiTools.push(newTool);
        }
    }
    
    // Update the tools list
    document.getElementById('toolsList').innerHTML = renderToolsList(aiTools);
    form.reset();
}

async function handleDeleteTool(toolId, aiTools) {
    const success = await deleteTool(toolId);
    if (success) {
        const index = aiTools.findIndex(t => t.id === toolId);
        if (index !== -1) {
            aiTools.splice(index, 1);
            document.getElementById('toolsList').innerHTML = renderToolsList(aiTools);
        }
    }
}
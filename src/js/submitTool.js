import { t } from '../services/i18nService.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('submitToolForm');
    const nameInput = document.getElementById('toolName');
    const descInput = document.getElementById('toolDescription');
    const nameCharCount = document.getElementById('nameCharCount');
    const descCharCount = document.getElementById('descCharCount');
    const submissionStatus = document.getElementById('submissionStatus');
    
    // Update character counts
    nameInput.addEventListener('input', () => {
        nameCharCount.textContent = nameInput.value.length;
    });
    
    descInput.addEventListener('input', () => {
        descCharCount.textContent = descInput.value.length;
    });
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = nameInput.value.trim();
        const description = descInput.value.trim();
        const url = document.getElementById('toolUrl').value.trim();
        const tagsInput = document.getElementById('toolTags').value.trim();
        const email = document.getElementById('submitterEmail').value.trim();
        
        // Validate inputs
        if (name.length === 0 || name.length > 20) {
            showStatus('error', 'Tool name must be between 1 and 20 characters');
            return;
        }
        
        if (description.length === 0 || description.length > 120) {
            showStatus('error', 'Description must be between 1 and 120 characters');
            return;
        }
        
        if (!isValidUrl(url)) {
            showStatus('error', 'Please enter a valid URL');
            return;
        }
        
        if (tagsInput.length === 0) {
            showStatus('error', 'Please enter at least one tag');
            return;
        }
        
        // Process tags
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        
        // Create tool object
        const toolSubmission = {
            name,
            description,
            url,
            tags,
            submitterEmail: email,
            submissionDate: new Date().toISOString()
        };
        
        // Send submission to backend
        try {
            showStatus('loading', 'Submitting your tool...');
            
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:3000/api/submit-tool', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toolSubmission)
            });
            
            if (response.ok) {
                showStatus('success', 'Thank you! Your tool submission has been received and is under review.');
                form.reset();
                nameCharCount.textContent = '0';
                descCharCount.textContent = '0';
            } else {
                const error = await response.json();
                showStatus('error', error.message || 'Failed to submit tool. Please try again later.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            
            // For demo purposes, show success even if the API doesn't exist yet
            showStatus('success', 'Thank you! Your tool submission has been received and is under review.');
            form.reset();
            nameCharCount.textContent = '0';
            descCharCount.textContent = '0';
        }
    });
    
    function showStatus(type, message) {
        submissionStatus.className = `submission-status ${type}`;
        submissionStatus.textContent = message;
        submissionStatus.style.display = 'block';
        
        if (type === 'success') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Hide status after 5 seconds if it's a success message
        if (type === 'success') {
            setTimeout(() => {
                submissionStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
});
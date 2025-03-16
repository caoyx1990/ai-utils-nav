// This is a placeholder for the server-side code
// You would implement this on your actual backend
require('dotenv').config();
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Handle tool submission
exports.submitTool = async (req, res) => {
    try {
        const { name, description, url, tags, submitterEmail } = req.body;
        
        // Generate a unique ID for the tool
        const id = Date.now();
        
        // Create tool object
        const newTool = {
            id,
            name,
            description,
            url,
            tags,
            create_date: new Date().toISOString().split('T')[0]
        };
        
        // Send email notification
        await sendEmailNotification(newTool, submitterEmail);
        
        // Store submission in database (implementation depends on your backend)
        // ...
        
        res.status(200).json({ message: 'Tool submitted successfully' });
    } catch (error) {
        console.error('Error submitting tool:', error);
        res.status(500).json({ message: 'Failed to submit tool' });
    }
};

// Send email notification
async function sendEmailNotification(tool, submitterEmail) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL, // Your email to receive notifications
        subject: 'New AI Tool Submission: ' + tool.name,
        html: `
            <h2>New AI Tool Submission</h2>
            <p><strong>Name:</strong> ${tool.name}</p>
            <p><strong>Description:</strong> ${tool.description}</p>
            <p><strong>URL:</strong> <a href="${tool.url}">${tool.url}</a></p>
            <p><strong>Tags:</strong> ${tool.tags.join(', ')}</p>
            <p><strong>Submitter Email:</strong> ${submitterEmail}</p>
            <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p>Please review this submission and add it to the appropriate category if approved.</p>
        `
    };
    
    return transporter.sendMail(mailOptions);
}
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Get port from environment or use 3000 for local development
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve other static files from root (for backward compatibility)
app.use(express.static(__dirname));

// API endpoint to get list of images
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'images');
    
    // Read the directory
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('Error reading images directory:', err);
            return res.status(500).json({ error: 'Error reading images directory' });
        }
        
        // Filter for image files
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );
        
        res.json(imageFiles);
    });
});

// For any other route, serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Only start the server if this file is run directly (not when imported as a module)
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// Export the Express API for Vercel
module.exports = app;

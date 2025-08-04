const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the project root
app.use(express.static('.'));

// API endpoint to get list of images
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'images', 'fabricmart');
    
    // Read the directory (in a real app, you would check if it exists first)
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop the server');
});

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Configuration
const config = {
    imageDir: path.join(__dirname, '../../images/fabricmart'),
    products: [
        'cushion-covers',
        'ipl-chair-covers',
        'table-covers',
        'chair-covers',
        'chair-bows',
        'backdrop',
        'ceiling',
        'chair-tie',
        'over-Ley',
        'dreps',
        'table-frills',
        'sofa-covers',
        'Droping',
        'digital color table cover'
    ],
    imagesPerProduct: 6, // Number of placeholder images to generate per product
    imageWidth: 800,
    imageHeight: 600
};

// Create a simple placeholder image with text
function createPlaceholderImage(text, width, height, backgroundColor, textColor) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add text
    ctx.fillStyle = textColor;
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Split text into multiple lines if needed
    const lines = text.split('\n');
    const lineHeight = 40;
    const startY = (height - (lines.length * lineHeight)) / 2;
    
    lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, startY + (index * lineHeight));
    });
    
    return canvas.toBuffer('image/jpeg', { quality: 0.8 });
}

// Generate placeholder images for all products
async function generatePlaceholderImages() {
    console.log('Starting to generate placeholder images...');
    
    // Create base directory if it doesn't exist
    if (!fs.existsSync(config.imageDir)) {
        fs.mkdirSync(config.imageDir, { recursive: true });
        console.log(`Created directory: ${config.imageDir}`);
    }
    
    for (const product of config.products) {
        const productDir = path.join(config.imageDir, product);
        
        // Create product directory if it doesn't exist
        if (!fs.existsSync(productDir)) {
            fs.mkdirSync(productDir, { recursive: true });
            console.log(`Created directory: ${productDir}`);
        }
        
        // Generate placeholder images
        for (let i = 1; i <= config.imagesPerProduct; i++) {
            const imagePath = path.join(productDir, `${i}.jpg`);
            
            // Skip if image already exists
            if (fs.existsSync(imagePath)) {
                console.log(`Skipping existing: ${imagePath}`);
                continue;
            }
            
            // Generate a unique color based on product name and image number
            const hue = (product.split('').reduce((a, b) => a + b.charCodeAt(0), 0) * i) % 360;
            const backgroundColor = `hsl(${hue}, 70%, 85%)`;
            const textColor = `hsl(${(hue + 180) % 360}, 70%, 30%)`;
            
            const imageText = `${product}\nImage ${i} of ${config.imagesPerProduct}\n${config.imageWidth}×${config.imageHeight}`;
            
            try {
                const imageBuffer = createPlaceholderImage(
                    imageText,
                    config.imageWidth,
                    config.imageHeight,
                    backgroundColor,
                    textColor
                );
                
                fs.writeFileSync(imagePath, imageBuffer);
                console.log(`Created: ${imagePath}`);
            } catch (error) {
                console.error(`Error creating ${imagePath}:`, error);
            }
        }
    }
    
    console.log('\nPlaceholder image generation complete!');
    console.log(`Images saved to: ${config.imageDir}`);
}

// Run the generator
generatePlaceholderImages().catch(console.error);

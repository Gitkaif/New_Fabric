const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    imageDir: path.join(__dirname, '../../images/fabricmart'),
    pagesDir: path.join(__dirname, 'pages'),
    templateFile: path.join(__dirname, 'template-gallery.html'),
    defaultImageCount: 12, // Default number of images to show per product
    products: [
        {
            id: 'cushion-covers',
            name: 'Cushion Covers',
            description: 'Stylish and comfortable cushion covers',
            icon: 'fa-cushion',
            folder: 'cushion-covers',
            visible: true
        },
        {
            id: 'ipl-chair-covers',
            name: 'IPL Chair Covers',
            description: 'Stylish and comfortable IPL Chair Covers',
            icon: 'fa-chairs',
            folder: 'ipl-chair-covers',
            visible: true
        },
        {
            id: 'table-covers',
            name: 'Table Covers',
            description: 'Elegant table coverings',
            icon: 'fa-table',
            folder: 'table-covers',
            visible: true
        },
        {
            id: 'chair-covers',
            name: 'Chair Covers',
            description: 'Luxurious chair coverings',
            icon: 'fa-chair',
            folder: 'chair-covers',
            visible: true
        },
        {
            id: 'chair-bows',
            name: 'Chair Bows',
            description: 'Beautiful bow decorations',
            icon: 'fa-ribbon',
            folder: 'chair-bows',
            visible: true
        },
        {
            id: 'backdrop',
            name: 'Backdrop',
            description: 'Beautiful event backdrops',
            icon: 'fa-image',
            folder: 'backdrop',
            visible: true
        },
        {
            id: 'ceiling',
            name: 'Ceiling',
            description: 'Elegant ceiling drapery',
            icon: 'fa-cloud',
            folder: 'ceiling',
            visible: true
        },
        {
            id: 'chair-tie',
            name: 'Chair Tie',
            description: 'Stylish chair ties',
            icon: 'fa-ribbon',
            folder: 'chair-tie',
            visible: true
        },
        {
            id: 'over-Ley',
            name: 'Over-Ley',
            description: 'Luxurious fabric overlays',
            icon: 'fa-layer-group',
            folder: 'over-Ley',
            visible: true
        },
        {
            id: 'table-frills',
            name: 'Table Frills',
            description: 'Elegant table decorations',
            icon: 'fa-table',
            folder: 'table-frills',
            visible: true
        },
        {
            id: 'dreps',
            name: 'Dreps',
            description: 'Elegant decorations',
            icon: 'fa-drapes',
            folder: 'dreps',
            visible: true
        },
        {
            id: 'sofa-covers',
            name: 'Sofa Covers',
            description: 'stylish Sofa Covers',
            icon: 'fa-sofa',
            folder: 'sofa-covers',
            visible: true
        },
        {
            id: 'Droping',
            name: 'Droping',
            description: 'Elegant Dropings',
            icon: 'fa-Droping',
            folder: 'Droping',
            visible: true
        },
        {
            id: 'digital color table cover',
            name: 'Digital Color Table Cover',
            description: 'Elegant Digital Color Table Cover',
            icon: 'fa-table',
            folder: 'digital color table cover',
            visible: true
        }
    ]
};

// Create directories if they don't exist
if (!fs.existsSync(config.pagesDir)) {
    fs.mkdirSync(config.pagesDir, { recursive: true });
}

if (!fs.existsSync(config.imageDir)) {
    fs.mkdirSync(config.imageDir, { recursive: true });
}

// Read the template file
let template;
try {
    template = fs.readFileSync(config.templateFile, 'utf8');
} catch (error) {
    console.error('Error reading template file:', error);
    process.exit(1);
}

// Function to create image placeholders if they don't exist
function createImagePlaceholders(productFolder) {
    const productImageDir = path.join(config.imageDir, productFolder);
    if (!fs.existsSync(productImageDir)) {
        fs.mkdirSync(productImageDir, { recursive: true });
        console.log(`Created image directory: ${productImageDir}`);
        
        // Create a placeholder README file
        const readmePath = path.join(productImageDir, 'README.md');
        if (!fs.existsSync(readmePath)) {
            fs.writeFileSync(readmePath, `# ${productFolder} Images\n\nAdd your product images here as 1.jpg, 2.jpg, etc.`);
            console.log(`Created README for: ${productFolder}`);
        }
    }
}

// Function to render template with data
function renderTemplate(template, data) {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        return data[key.trim()] || '';
    });
}

// Generate HTML files for each product
config.products.forEach(product => {
    // Create image directory and placeholders
    createImagePlaceholders(product.folder);
    
    // Generate the HTML content
    const htmlContent = renderTemplate(template, {
        id: product.id,
        name: product.name,
        description: product.description,
        icon: product.icon,
        folder: product.folder,
        imageCount: config.defaultImageCount,
        timestamp: new Date().toISOString()
    });
    
    // Write the HTML file
    const outputPath = path.join(config.pagesDir, `${product.id}.html`);
    fs.writeFileSync(outputPath, htmlContent);
    console.log(`Generated: ${outputPath}`);
});

// Update the index.html with the correct product visibility
const indexPath = path.join(__dirname, '../../index.html');
if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Update the main grid (first 6 visible products)
    const mainGridProducts = config.products.filter(p => p.visible).slice(0, 6);
    // Update the more-categories section (remaining products)
    const moreCategoriesProducts = config.products.filter(p => !p.visible);
    
    // This is a simplified example - in a real implementation, you would update the HTML structure
    console.log('\nUpdate your index.html with the following product structure:');
    console.log('Main Grid Products:', mainGridProducts.map(p => p.name).join(', '));
    console.log('More Categories:', moreCategoriesProducts.map(p => p.name).join(', '));
}

console.log('\nProduct gallery generation complete!');
console.log(`Add your product images to: ${config.imageDir}/[product-folder]/`);
console.log('Make sure to place your product images in the following folders:');
config.products.forEach(product => {
    console.log(`- /images/fabricmart/${product.folder}/`);
});
console.log('\nEach folder should contain numbered images (1.jpg, 2.jpg, etc.)');

const fs = require('fs');
const path = require('path');

// List of product categories
const categories = [
    'Backdrops',
    'Ceiling',
    'Chair Covers',
    'Table Covers',
    'Chair Bows',
    'Table Frills',
    'Cushion Covers',
    'Dreps',
    'Dropping',
    'IPL Chair Cover',
    'Over Ley',
    'Digital Color Table Cover'
];

// Read the template
const templatePath = path.join(__dirname, 'template.html');
let templateContent = fs.readFileSync(templatePath, 'utf8');

// Create a directory for the product pages if it doesn't exist
const pagesDir = path.join(__dirname, 'pages');
if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir);
}

// Generate a page for each category
categories.forEach(category => {
    // Create a slug for the filename (lowercase, replace spaces with hyphens)
    const slug = category.toLowerCase().replace(/ /g, '-');
    const fileName = `${slug}.html`;
    
    // Replace placeholders in the template
    let pageContent = templateContent
        .replace(/id="product-category">[^<]*</, `id="product-category">${category}<`)
        .replace(/<title>[^<]*<\/title>/, `<title>${category} - Fabric Wholesaler</title>`)
        .replace(/const category = '[^']*'/, `const category = '${category}'`);
    
    // Write the new HTML file
    const filePath = path.join(pagesDir, fileName);
    fs.writeFileSync(filePath, pageContent);
    
    console.log(`Created: ${filePath}`);
});

console.log('\nAll product pages have been created successfully!');

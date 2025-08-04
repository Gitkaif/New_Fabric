const fs = require('fs');
const path = require('path');

// Create pages directory if it doesn't exist
const pagesDir = path.join(__dirname, 'pages');
if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
}

// Read the template
const templatePath = path.join(__dirname, 'template-gallery.html');
let template = fs.readFileSync(templatePath, 'utf8');

// Create pages for each product type
const products = [
    'backdrops',
    'ceiling',
    'chair-covers',
    'table-covers',
    'chair-bows',
    'table-frills',
    'cushion-covers',
    'ipl-chair-covers',
    'over-Ley',
    'dreps',
    'sofa-covers',
    'Droping',
    'digital color table cover'
];

products.forEach(product => {
    const pageContent = template.replace('Product Gallery', `${product.charAt(0).toUpperCase() + product.slice(1)} Gallery`);
    const outputPath = path.join(pagesDir, `${product}.html`);
    fs.writeFileSync(outputPath, pageContent);
    console.log(`Created: ${outputPath}`);
});

console.log('All product gallery pages have been generated!');

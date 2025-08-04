const fs = require('fs');
const path = require('path');

// Base directory for product images
const baseDir = path.join(__dirname, 'images', 'fabricmart');

// List of product folders to create
const productFolders = [
    'backdrop',
    'ceiling',
    'chair-tie',
    'over-ley',
    'cushion-covers',
    'ipl-chair-covers',
    'table-covers',
    'chair-covers',
    'chair-bows',
    'dreps',
    'table-frills',
    'sofa-covers',
    'droping',
    'digital-color-table-cover'
];

// Create base directory if it doesn't exist
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log(`Created directory: ${baseDir}`);
}

// Create each product folder
productFolders.forEach(folder => {
    const folderPath = path.join(baseDir, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created directory: ${folderPath}`);
        
        // Create a placeholder README in each folder
        const readmePath = path.join(folderPath, 'README.txt');
        const readmeContent = `Place your ${folder} images in this directory as 1.jpg, 2.jpg, etc.`;
        fs.writeFileSync(readmePath, readmeContent);
        console.log(`   - Added README to ${folder}`);
    } else {
        console.log(`Directory already exists: ${folderPath}`);
    }
});

console.log('\n✅ All product image folders have been created!');
console.log('\nNext steps:');
console.log('1. Add your product images to their respective folders in /images/fabricmart/');
console.log('2. Name your images as 1.jpg, 2.jpg, etc. in each folder');
console.log('3. The gallery will automatically load these images');

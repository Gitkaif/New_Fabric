const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuration
const SOURCE_DIR = path.join(__dirname, 'images');
const OUTPUT_DIR = path.join(__dirname, 'compressed_images');
const MAX_WIDTH = 1200;
const QUALITY = 80; // 1-100, higher is better quality but larger file

async function compressImage(inputPath, outputPath) {
    try {
        const stats = await fs.stat(inputPath);
        const originalSize = stats.size;

        // Process the image
        await sharp(inputPath)
            .resize({ 
                width: MAX_WIDTH,
                withoutEnlargement: true // Don't enlarge if smaller than MAX_WIDTH
            })
            .jpeg({ 
                quality: QUALITY,
                mozjpeg: true 
            })
            .toFile(outputPath);

        const newStats = await fs.stat(outputPath);
        const newSize = newStats.size;
        const saved = ((originalSize - newSize) / 1024).toFixed(2);
        const savedPercent = ((1 - (newSize / originalSize)) * 100).toFixed(2);
        
        console.log(`✅ Compressed: ${path.basename(inputPath)} - Saved: ${saved}KB (${savedPercent}%)`);
        return { success: true, saved: savedPercent };
    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
        return { success: false, error: error.message };
    }
}

async function processDirectory(source, target) {
    try {
        // Create target directory if it doesn't exist
        await fs.mkdir(target, { recursive: true });

        const items = await fs.readdir(source, { withFileTypes: true });
        
        for (const item of items) {
            const sourcePath = path.join(source, item.name);
            const targetPath = path.join(target, item.name);

            if (item.isDirectory()) {
                // Recursively process subdirectories
                await processDirectory(sourcePath, targetPath);
            } else if (item.isFile()) {
                // Check if file is an image
                const ext = path.extname(item.name).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                    await compressImage(sourcePath, targetPath);
                } else {
                    // Copy non-image files as is
                    await fs.copyFile(sourcePath, targetPath);
                    console.log(`📄 Copied: ${item.name} (not an image)`);
                }
            }
        }
    } catch (error) {
        console.error('Error processing directory:', error);
    }
}

// Main function
async function main() {
    console.log('🚀 Starting image compression...');
    console.log(`Source: ${SOURCE_DIR}`);
    console.log(`Destination: ${OUTPUT_DIR}`);
    console.log('----------------------------------------');

    try {
        // Check if source directory exists
        try {
            await fs.access(SOURCE_DIR);
        } catch (error) {
            console.error(`❌ Source directory does not exist: ${SOURCE_DIR}`);
            return;
        }

        // Process all images
        await processDirectory(SOURCE_DIR, OUTPUT_DIR);
        
        console.log('----------------------------------------');
        console.log('🎉 All images have been processed!');
        console.log(`Check the 'compressed_images' folder for the optimized images.`);
        console.log(`You can now delete the original 'images' folder if you're satisfied with the results.`);
    } catch (error) {
        console.error('❌ An error occurred:', error);
    }
}

// Run the script
main();

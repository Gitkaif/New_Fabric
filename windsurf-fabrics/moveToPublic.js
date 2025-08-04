const fs = require('fs').promises;
const path = require('path');

async function moveFile(source, target) {
    const targetDir = path.dirname(target);
    await fs.mkdir(targetDir, { recursive: true });
    await fs.rename(source, target);
    console.log(`Moved: ${source} → ${target}`);
}

async function moveStaticFiles() {
    try {
        // Create public directory if it doesn't exist
        await fs.mkdir('public', { recursive: true });
        
        // Files and directories to move
        const itemsToMove = [
            'css',
            'js',
            'images',
            'products',
            'index.html'
        ];

        for (const item of itemsToMove) {
            try {
                await fs.access(item);
                await moveFile(item, path.join('public', item));
            } catch (err) {
                console.log(`Skipping ${item}: ${err.message}`);
            }
        }

        console.log('\n✅ All files moved to public directory!');
        console.log('You can now commit these changes and push to your repository.');
    } catch (error) {
        console.error('Error moving files:', error);
    }
}

moveStaticFiles();

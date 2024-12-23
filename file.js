const fs = require('fs/promises');

async function saveFile(filePath, data) {
    try {
        const result = await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`File successfully written to ${filePath}`);
        return result;
        
    } catch (error) {
        console.log('Error writing to file: ' + err);
    }
}

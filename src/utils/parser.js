const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class Parser {
    constructor(filePath) {
        this.filePath = path.resolve(__dirname, filePath);
    }

    async parseCSV() {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }

    async parseJSON() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Failed to parse JSON: ${error.message}`);
        }
    }
}

module.exports = Parser;
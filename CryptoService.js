const crypto = require('crypto');

class UniqueStringGenerator {
    constructor() {
        this.generatedStrings = new Set();
    }

    generateString() {
        let newString;
        do {
            newString = crypto.randomBytes(12).toString('hex'); // Generates a 10-character string
        } while (this.generatedStrings.has(newString));

        this.generatedStrings.add(newString);
        return newString;
    }
}

// Example use of the UniqueStringGenerator class
const generator = new UniqueStringGenerator();

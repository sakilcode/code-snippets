import chalk from "chalk";
import fs from "fs";

function validateFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(chalk.red(`File does not exist: ${filePath}`));
        return false;
    }
    if (!fs.lstatSync(filePath).isFile()) {
        console.error(chalk.red(`Path is not a file: ${filePath}`));
        return false;
    }

    return true;
}

function readJsonFile(filePath) {
    if (!validateFile(filePath)) return;

    const json = fs.readFileSync(filePath, 'utf8');
    try {
        return JSON.parse(json);
        
    } catch (error) {
        console.error(chalk.red(`Failed to parse JSON in file: ${filePath}. ${error.message}`));
    }
}

function readTextFile(filePath) {
    if (!validateFile(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    return content;
}

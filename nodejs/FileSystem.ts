import fs from "fs";

export default class FileSystem {
    isPathExist(path: string) {
        return fs.existsSync(path);
    }

    isFile(filePath: string) {
        return fs.lstatSync(filePath).isFile();
    }

    isDirectory(dirPath: string) {
        return fs.lstatSync(dirPath).isDirectory();
    }

    listDirectories(dirPath: string) {
        const dirnames: string[] = [];
        const isDirectoryExist = this.isPathExist(dirPath);

        if (isDirectoryExist) {
            const dirs = fs.readdirSync(dirPath, { withFileTypes: true });
            for (const dir of dirs) {
                dir.isDirectory() && dirnames.push(dir.name);
            }
        }

        return dirnames;

    }

    listFiles(dirPath: string) {
        const filenames: string[] = [];
        const isDirectoryExist = this.isPathExist(dirPath);

        if (isDirectoryExist) {
            const files = fs.readdirSync(dirPath, { withFileTypes: true });
            for (const file of files) {
                file.isFile() && filenames.push(file.name);
            }
        }

        return filenames;
    }

    readFile(filePath: string) {
        const isFileExist = this.isPathExist(filePath);

        if(!isFileExist) {
            return new Error("Provide file path is does not exist.");
        }

        const isItFile = this.isFile(filePath);

        if(!isItFile) {
            return new Error("Provided file path is not a file.");
        }

        try {
            const content = fs.readFileSync(filePath);
            return content.toString();
            
        } catch (error) {
            return new Error(`Got error while reading the file`)
        }

    }

}

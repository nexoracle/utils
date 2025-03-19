import fs from "fs"

export const readFile = (path: string): string | null => {
    try {
        return fs.readFileSync(path, "utf-8");
    } catch (error) {
        console.error("File Read Error:", error instanceof Error ? error.message : error);
        return null;
    }
};

export const writeFile = (path: string, data: string): void => {
    try {
        fs.writeFileSync(path, data, "utf-8");
    } catch (error) {
        console.error("File Write Error:", error instanceof Error ? error.message : error);
    }
};

export const appendToFile = (path: string, data: string): void => {
    try {
        fs.appendFileSync(path, data + "\n", "utf-8");
    } catch (error) {
        console.error("File Append Error:", error instanceof Error ? error.message : error);
    }
};

export const deleteFile = (path: string): void => {
    try {
        fs.unlinkSync(path);
    } catch (error) {
        console.error("File Delete Error:", error instanceof Error ? error.message : error);
    }
};

export const fileExists = (path: string): boolean => {
    return fs.existsSync(path);
};
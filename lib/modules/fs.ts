import fs from "fs";
import path from "path";

export const readFile = (filePath: string): string | null => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error("File Read Error:", error instanceof Error ? error.message : error);
    return null;
  }
};

export const writeFile = (filePath: string, data: string): void => {
  try {
    fs.writeFileSync(filePath, data, "utf-8");
  } catch (error) {
    console.error("File Write Error:", error instanceof Error ? error.message : error);
  }
};

export const appendToFile = (filePath: string, data: string): void => {
  try {
    fs.appendFileSync(filePath, data + "\n", "utf-8");
  } catch (error) {
    console.error("File Append Error:", error instanceof Error ? error.message : error);
  }
};

export const deleteFile = (filePath: string): void => {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("File Delete Error:", error instanceof Error ? error.message : error);
  }
};

export const fileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

export const createDirectory = (dirPath: string): void => {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (error) {
    console.error("Directory Create Error:", error instanceof Error ? error.message : error);
  }
};

export const removeDirectory = (dirPath: string): void => {
  try {
    fs.rmdirSync(dirPath);
  } catch (error) {
    console.error("Directory Remove Error:", error instanceof Error ? error.message : error);
  }
};

export const listFiles = (dirPath: string): string[] | null => {
  try {
    return fs.readdirSync(dirPath);
  } catch (error) {
    console.error("Read Directory Error:", error instanceof Error ? error.message : error);
    return null;
  }
};

export const getFileStats = (filePath: string): fs.Stats | null => {
  try {
    return fs.statSync(filePath);
  } catch (error) {
    console.error("File Stats Error:", error instanceof Error ? error.message : error);
    return null;
  }
};

export const renameFile = (oldPath: string, newPath: string): void => {
  try {
    fs.renameSync(oldPath, newPath);
  } catch (error) {
    console.error("File Rename Error:", error instanceof Error ? error.message : error);
  }
};

export const copyFile = (source: string, destination: string): void => {
  try {
    fs.copyFileSync(source, destination);
  } catch (error) {
    console.error("File Copy Error:", error instanceof Error ? error.message : error);
  }
};

export const watchFile = (filePath: string, callback: (curr: fs.Stats, prev: fs.Stats) => void): void => {
  try {
    fs.watchFile(filePath, callback);
  } catch (error) {
    console.error("File Watch Error:", error instanceof Error ? error.message : error);
  }
};

export const unwatchFile = (filePath: string): void => {
  try {
    fs.unwatchFile(filePath);
  } catch (error) {
    console.error("File Unwatch Error:", error instanceof Error ? error.message : error);
  }
};

export const getAbsolutePath = (relativePath: string): string => {
  return path.resolve(relativePath);
};

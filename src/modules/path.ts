import path from "path";

/**
 * Get file name with or without extension
 */
export const getFileName = (filePath: string, withExt = true): string => {
    return withExt ? path.basename(filePath) : path.basename(filePath, path.extname(filePath));
};

/**
 * Get absolute path from relative path
 */
export const getAbsolutePath = (relativePath: string): string => path.resolve(relativePath);

/**
 * Normalize a file path (removes extra slashes and dots)
 */
export const normalizePath = (filePath: string): string => path.normalize(filePath);

/**
 * Get file extension with or without dot
 */
export const getFileExtension = (filePath: string, withDot = true): string => {
    const ext = path.extname(filePath);
    return withDot ? ext : ext.replace(".", "");
};

/**
 * Join multiple paths dynamically
 */
export const joinPaths = (...paths: string[]): string => path.join(...paths);

/**
 * Get relative path from one location to another
 */
export const getRelativePath = (from: string, to: string): string => path.relative(from, to);

import https from "https";
import fs from "fs";

/**
 * Log errors to the console.
 * @param error Error object
 */
function logError(error: any) {
  console.error(`[HTTPS Error]: ${error.message}`);
}

/**
 * Download a file from an HTTPS URL.
 * @param url The file URL.
 * @param destination The local file path to save.
 * @returns Promise resolving when download is complete.
 */
export function downloadFile(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, (res) => {
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      logError(err);
      fs.unlink(destination, () => reject(err));
    });
  });
}


/**
 * Validate if an HTTPS URL is accessible.
 * @param url The URL to check.
 * @returns True if accessible, false otherwise.
 */
export function isURLAccessible(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on("error", () => resolve(false));
  });
}

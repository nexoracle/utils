import https from "https";
import fs from "fs";

export function downloadFile(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (res) => {
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        console.error(err);
        fs.unlink(destination, () => reject(err));
      });
  });
}

export function isURLAccessible(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        const statusCode = res.statusCode ?? 0;
        resolve(statusCode >= 200 && statusCode < 400);
      })
      .on("error", () => resolve(false));
  });
}

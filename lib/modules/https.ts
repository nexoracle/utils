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

export function isURLAccessible(url: string): Promise<{
  success: boolean;
  status?: number;
  statusText?: string;
  error?: string;
}> {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        const success = (res.statusCode ?? 0) >= 200 && (res.statusCode ?? 0) < 400;
        resolve({
          success,
          status: res.statusCode,
          statusText: res.statusMessage || "None",
        });

        res.on("data", () => {});
      })
      .on("error", (err) => {
        resolve({
          success: false,
          error: err.message || "An Error Occured",
        });
      });
  });
}

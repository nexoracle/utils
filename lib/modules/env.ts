import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

interface EnvLoader {
  load: (customPath?: string) => void;
}

function unescapeValue(value: string): string {
  return value.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\\\/g, "\\").replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\//g, "/").replace(/\\=/g, "=");
}

export const env: EnvLoader = {
  load: (customPath?: string): void => {
    const envPath = customPath ? resolve(customPath) : resolve(process.cwd(), ".env");

    if (!existsSync(envPath)) {
      return;
    }

    try {
      const content = readFileSync(envPath, "utf8");

      content.split(/\r?\n/).forEach((line) => {
        line = line.trim();
        if (!line || line.startsWith("#")) return;

        let inQuotes = false;
        let quoteChar = "";
        let commentIndex = -1;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if ((char === '"' || char === "'") && (i === 0 || line[i - 1] !== "\\")) {
            if (!inQuotes) {
              inQuotes = true;
              quoteChar = char;
            } else if (char === quoteChar) {
              inQuotes = false;
            }
          } else if (char === "#" && !inQuotes) {
            commentIndex = i;
            break;
          }
        }

        if (commentIndex !== -1) {
          line = line.substring(0, commentIndex).trim();
        }

        const firstEqualIndex = line.indexOf("=");
        if (firstEqualIndex === -1) return;

        const key = line.slice(0, firstEqualIndex).trim();
        let value = line.slice(firstEqualIndex + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        if (key) {
          process.env[key.trim()] = unescapeValue(value);
        }
      });
    } catch (err) {
      console.error(`[ENV] Failed to load:`, err);
    }
  },
};

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

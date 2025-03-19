import { exec, execSync, spawn } from "child_process";

/**
 * Run a command asynchronously and return the output
 */
export const runCommand = (command: string, cwd?: string, timeout = 5000): Promise<string> => {
    return new Promise((resolve, reject) => {
        const process = exec(command, { cwd, timeout }, (error, stdout, stderr) => {
            if (error) return reject(`Error: ${error.message}`);
            if (stderr) return reject(`Stderr: ${stderr}`);
            resolve(stdout.trim());
        });

        process.stdout?.on("data", (data) => console.log(data.toString()));
        process.stderr?.on("data", (data) => console.error(data.toString()));
    });
};

/**
 * Run a command synchronously and return output
 */
export const runCommandSync = (command: string, cwd?: string): string | null => {
    try {
        return execSync(command, { cwd, encoding: "utf-8" }).trim();
    } catch (error) {
        console.error(`Command Failed: ${error instanceof Error ? error.message : error}`);
        return null;
    }
};

/**
 * Run a command with arguments using spawn
 */
export const runSpawn = (command: string, args: string[], cwd?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { cwd, shell: true });

        let output = "";
        process.stdout.on("data", (data) => (output += data.toString()));
        process.stderr.on("data", (data) => console.error(`Stderr: ${data.toString()}`));
        process.on("close", (code) => (code === 0 ? resolve(output.trim()) : reject(`Exited with code ${code}`)));
    });
};

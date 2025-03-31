import { exec, execSync, spawn } from "child_process";

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

export const runCommandSync = (command: string, cwd?: string): string | null => {
  try {
    return execSync(command, { cwd, encoding: "utf-8" }).trim();
  } catch (error) {
    console.error(`Command Failed: ${error instanceof Error ? error.message : error}`);
    return null;
  }
};

export const runSpawn = (command: string, args: string[], cwd?: string, timeout = 5000): Promise<string> => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { cwd, shell: true });
    let output = "";

    const timer = setTimeout(() => {
      process.kill();
      reject("Process timeout");
    }, timeout);

    process.stdout.on("data", (data) => (output += data.toString()));
    process.stderr.on("data", (data) => console.error(`Stderr: ${data.toString()}`));
    process.on("close", (code) => {
      clearTimeout(timer);
      code === 0 ? resolve(output.trim()) : reject(`Exited with code ${code}`);
    });
  });
};

export const runCommandDetached = (command: string, args: string[], cwd?: string): void => {
  const process = spawn(command, args, {
    cwd,
    shell: true,
    detached: true,
    stdio: "ignore",
  });
  process.unref();
};

export const runCommandInteractive = (command: string, args: string[], cwd?: string): void => {
  spawn(command, args, {
    cwd,
    shell: true,
    stdio: "inherit",
  });
};

export const checkCommandExists = (command: string): boolean => {
  try {
    execSync(`command -v ${command} || where ${command}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

export const killProcess = (pid: number, signal: string = "SIGTERM"): boolean => {
  try {
    process.kill(pid, signal as NodeJS.Signals);
    return true;
  } catch (error) {
    console.error(`Failed to kill process ${pid}: ${error instanceof Error ? error.message : error}`);
    return false;
  }
};

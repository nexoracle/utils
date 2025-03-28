import os from "os";

export const getSystemInfo = () => ({
  platform: os.platform(),
  osType: os.type(),
  release: os.release(),
  architecture: os.arch(),
  cpuModel: os.cpus()[0]?.model || "Unknown",
  cpuCores: os.cpus().length,
  totalMemory: `${(os.totalmem() / 1e9).toFixed(2)} GB`,
  freeMemory: `${(os.freemem() / 1e9).toFixed(2)} GB`,
  uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
  homeDir: os.homedir(),
  hostname: os.hostname(),
  tempDir: os.tmpdir(),
  endianness: os.endianness(),
  priority: os.getPriority(),
  constants: os.constants,
});

export const getCpuLoad = () => os.loadavg();

export const getNetworkInterfaces = () => os.networkInterfaces();

export const getUserInfo = () => os.userInfo();

export const getUptime = () => os.uptime();

export const getTempDirectory = () => os.tmpdir();

export const getProcessPriority = (pid: number = 0) => os.getPriority(pid);

export const setProcessPriority = (pid: number = 0, priority: number) => {
  try {
    os.setPriority(pid, priority);
    return `Priority of process ${pid} set to ${priority}`;
  } catch (error) {
    return `Failed to set priority: ${error}`;
  }
};

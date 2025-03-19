import os from "os";

/**
 * Get detailed system information
 */
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
});

/**
 * Get CPU Load Average
 */
export const getCpuLoad = () => os.loadavg();

/**
 * Get Network Interfaces
 */
export const getNetworkInterfaces = () => os.networkInterfaces();

/**
 * Get User Info
 */
export const getUserInfo = () => os.userInfo();

import { performance, PerformanceObserver, monitorEventLoopDelay, PerformanceNodeTiming, EntryType } from "perf_hooks";

/**
 * Logs messages
 */
const log = (message: string, error: any = null) => {
  console.log(`[perf_hooks] ${message}`);
  if (error) console.error(error);
};

export const perf_hooks = {
  /**
   * Get the current high-resolution timestamp in milliseconds
   */
  now: (): number => {
    try {
      return performance.now();
    } catch (error) {
      log("Error getting performance timestamp", error);
      return -1;
    }
  },

  /**
   * Get the time origin (when the performance API started tracking)
   */
  getTimeOrigin: (): number => {
    try {
      return performance.timeOrigin;
    } catch (error) {
      log("Error getting time origin", error);
      return -1;
    }
  },

  /**
   * Measures the execution time of a function in milliseconds
   */
  measureExecutionTime: (fn: Function, ...args: any[]): number => {
    try {
      const start = performance.now();
      fn(...args);
      return performance.now() - start;
    } catch (error) {
      log("Error measuring execution time", error);
      return -1;
    }
  },

  /**
   * Tracks event loop delays (helps identify performance issues)
   */
  monitorEventLoopDelay: (): any => {
    try {
      const histogram = monitorEventLoopDelay();
      histogram.enable();
      return histogram;
    } catch (error) {
      log("Error monitoring event loop delay", error);
      return null;
    }
  },

  /**
   * Sets up a PerformanceObserver to watch for performance entries
   */
  observePerformance: (
    entryTypes: EntryType[],
    callback: (list: PerformanceObserverEntryList) => void
  ): PerformanceObserver | null => {
    try {
      const observer = new PerformanceObserver((list) => callback(list));
      observer.observe({ entryTypes });
      return observer;
    } catch (error) {
      log("Error setting up PerformanceObserver", error);
      return null;
    }
  },

  /**
   * Returns Node.js performance timings (including startup time)
   */
  getNodePerformanceTiming: (): PerformanceNodeTiming | null => {
    try {
      return performance.nodeTiming;
    } catch (error) {
      log("Error getting Node.js performance timing", error);
      return null;
    }
  },
};

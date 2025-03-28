import { performance, PerformanceObserver, monitorEventLoopDelay, PerformanceNodeTiming, EntryType } from "perf_hooks";

export const perf_hooks = {
  now: (): number => {
    try {
      return performance.now();
    } catch (error) {
      console.error("Error getting performance timestamp", error);
      return -1;
    }
  },

  getTimeOrigin: (): number => {
    try {
      return performance.timeOrigin;
    } catch (error) {
      console.error("Error getting time origin", error);
      return -1;
    }
  },

  measureExecutionTime: (fn: Function, ...args: any[]): number => {
    try {
      const start = performance.now();
      fn(...args);
      return performance.now() - start;
    } catch (error) {
      console.error("Error measuring execution time", error);
      return -1;
    }
  },

  monitorEventLoopDelay: (): any => {
    try {
      const histogram = monitorEventLoopDelay();
      histogram.enable();
      return histogram;
    } catch (error) {
      console.error("Error monitoring event loop delay", error);
      return null;
    }
  },

  observePerformance: (entryTypes: EntryType[], callback: (list: PerformanceObserverEntryList) => void): PerformanceObserver | null => {
    try {
      const observer = new PerformanceObserver((list) => callback(list));
      observer.observe({ entryTypes });
      return observer;
    } catch (error) {
      console.error("Error setting up PerformanceObserver", error);
      return null;
    }
  },


  getNodePerformanceTiming: (): PerformanceNodeTiming | null => {
    try {
      return performance.nodeTiming;
    } catch (error) {
      console.error("Error getting Node.js performance timing", error);
      return null;
    }
  },
};

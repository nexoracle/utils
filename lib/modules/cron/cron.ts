import { ScheduledTask } from "./scheduled-task";
import BackgroundScheduledTask from "./backgroundScheduledTask";
import { validatePattern } from "./validatePattern";
import { storage } from "./storage";

function createTask(expression: string, func: Function | string, options?: any): ScheduledTask | BackgroundScheduledTask {
  if (typeof func === "string") return new BackgroundScheduledTask(expression, func, options);
  return new ScheduledTask(expression, func, options);
}

function schedule(expression: string, func: Function | string, options?: any): ScheduledTask | BackgroundScheduledTask {
  const task = createTask(expression, func, options);

  storage.save(task);
  return task;
}

function getTasks(): Map<string, ScheduledTask | BackgroundScheduledTask> {
  return storage.getTasks();
}

function validate(expression: string): boolean {
  try {
    validatePattern(expression);

    return true;
  } catch (_) {
    return false;
  }
}

export { schedule, validate, getTasks };

// Inspired By: https://github.com/node-cron/node-cron
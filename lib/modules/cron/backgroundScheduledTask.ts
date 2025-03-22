import { EventEmitter } from "events";
import path from "path";
import { fork, ChildProcess } from "child_process";
import { ScheduledTask } from "./scheduled-task";
import { getRandom } from "../../functions/tools";

let scheduledTask: ScheduledTask;

function register(message: any): void {
  const script = require(message.path);
  scheduledTask = new ScheduledTask(message.cron, script.task, message.options);
  scheduledTask.on("task-done", (result: any) => {
    if (process.send) {
      process.send({ type: "task-done", result });
    }
  });
  if (process.send) {
    process.send({ type: "registered" });
  }
}

if (process.send) {
  process.on("message", (message: any) => {
    switch (message.type) {
      case "register":
        return register(message);
    }
  });
}

const daemonPath = __filename;

class BackgroundScheduledTask extends EventEmitter {
  private cronExpression: string;
  private taskPath: string;
  private options: any;
  private forkProcess: ChildProcess | null = null;

  constructor(cronExpression: string, taskPath: string, options?: any) {
    super();
    if (!options) {
      options = {
        scheduled: true,
        recoverMissedExecutions: false,
      };
    }
    this.cronExpression = cronExpression;
    this.taskPath = taskPath;
    this.options = options;
    this.options.name = this.options.name || getRandom({ Alphabets: true, Numbers: true, DateNow: true, length: 40 });

    if (options.scheduled) {
      this.start();
    }
  }

  start(): void {
    this.stop();
    this.forkProcess = fork(daemonPath);

    this.forkProcess.on("message", (message: any) => {
      switch (message.type) {
        case "task-done":
          this.emit("task-done", message.result);
          break;
      }
    });

    const options = this.options;
    options.scheduled = true;

    this.forkProcess.send({
      type: "register",
      path: path.resolve(this.taskPath),
      cron: this.cronExpression,
      options: options,
    });
  }

  stop(): void {
    if (this.forkProcess) {
      this.forkProcess.kill();
    }
  }

  pid(): number | undefined {
    if (this.forkProcess) {
      return this.forkProcess.pid;
    }
  }

  isRunning(): boolean {
    return !!this.forkProcess && !this.forkProcess.killed;
  }
}

export default BackgroundScheduledTask;

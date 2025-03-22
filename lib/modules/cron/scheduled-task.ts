import { EventEmitter } from "events";
import { Task } from "./task";
import { Scheduler } from "./scheduler";
import { getRandom } from "../../functions/tools";

export class ScheduledTask extends EventEmitter {
  private _task: Task;
  private _scheduler: Scheduler;
  public options: any;

  constructor(cronExpression: string, func: Function, options?: any) {
    super();
    if (!options) {
      options = {
        scheduled: true,
        recoverMissedExecutions: false,
      };
    }

    this.options = options;
    this.options.name = this.options.name || getRandom({ Alphabets: true, Numbers: true, DateNow: true, length: 40 });

    this._task = new Task(func);
    this._scheduler = new Scheduler(cronExpression, options.timezone, options.recoverMissedExecutions);

    this._scheduler.on("scheduled-time-matched", (now: any) => {
      this.now(now);
    });

    if (options.scheduled !== false) {
      this._scheduler.start();
    }

    if (options.runOnInit === true) {
      this.now("init");
    }
  }

  now(now: any = "manual"): void {
    const result = this._task.execute(now);
    this.emit("task-done", result);
  }

  start(): void {
    this._scheduler.start();
  }

  stop(): void {
    this._scheduler.stop();
  }
}

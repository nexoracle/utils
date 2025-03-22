import { EventEmitter } from "events";

export class Task extends EventEmitter {
  private _execution: Function;

  constructor(execution: Function) {
    super();
    if (typeof execution !== "function") {
      throw "execution must be a function";
    }
    this._execution = execution;
  }

  execute(now: any): any {
    let exec;
    try {
      exec = this._execution(now);
    } catch (error) {
      return this.emit("task-failed", error);
    }

    if (exec instanceof Promise) {
      return exec.then(() => this.emit("task-finished")).catch((error) => this.emit("task-failed", error));
    } else {
      this.emit("task-finished");
      return exec;
    }
  }
}

import { EventEmitter } from "events";
import { TimeZone } from "./timezone";

export class Scheduler extends EventEmitter {
  private timeMatcher: TimeZone;
  private autorecover: boolean;
  private timeout: NodeJS.Timeout | null = null;

  constructor(pattern: string, timezone: string | undefined, autorecover: boolean) {
    super();
    this.timeMatcher = new TimeZone(pattern, timezone);
    this.autorecover = autorecover;
  }

  start(): void {
    this.stop();
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    let lastCheck = process.hrtime();
    let lastExecution = this.timeMatcher.apply(new Date());

    const matchTime = () => {
      const delay = 1000;
      const elapsedTime = process.hrtime(lastCheck);
      const elapsedMs = (elapsedTime[0] * 1e9 + elapsedTime[1]) / 1e6;
      const missedExecutions = Math.floor(elapsedMs / 1000);

      for (let i = missedExecutions; i >= 0; i--) {
        const date = new Date(new Date().getTime() - i * 1000);
        let date_tmp = this.timeMatcher.apply(date);
        if (lastExecution.getTime() < date_tmp.getTime() && (i === 0 || this.autorecover) && this.timeMatcher.match(date)) {
          this.emit("scheduled-time-matched", date_tmp);
          date_tmp.setMilliseconds(0);
          lastExecution = date_tmp;
        }
      }
      lastCheck = process.hrtime();
      this.timeout = setTimeout(matchTime, delay);
    };
    matchTime();
  }

  stop(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  }
}

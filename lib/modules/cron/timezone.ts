import { validatePattern } from "./validatePattern";
import { validateExpression } from "./validateExpression";

function matchPattern(pattern: string, value: number): boolean {
  if (pattern.indexOf(",") !== -1) {
    const patterns = pattern.split(",");
    return patterns.some((p) => matchPattern(p, value));
  }

  if (pattern.indexOf("-") !== -1) {
    const [start, end] = pattern.split("-").map((x) => parseInt(x, 10));
    return value >= start && value <= end;
  }

  return pattern === value.toString();
}

export class TimeZone {
  private pattern: string;
  private timezone: string | undefined;
  private expressions: string[];
  private dtf: Intl.DateTimeFormat | null;

  constructor(pattern: string, timezone: string | undefined) {
    validatePattern(pattern);
    this.pattern = validateExpression(pattern);
    this.timezone = timezone;
    this.expressions = this.pattern.split(" ");
    this.dtf = this.timezone
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
          timeZone: this.timezone,
        })
      : null;
  }

  match(date: Date): boolean {
    date = this.apply(date);

    const runOnSecond = matchPattern(this.expressions[0], date.getSeconds());
    const runOnMinute = matchPattern(this.expressions[1], date.getMinutes());
    const runOnHour = matchPattern(this.expressions[2], date.getHours());
    const runOnDay = matchPattern(this.expressions[3], date.getDate());
    const runOnMonth = matchPattern(this.expressions[4], date.getMonth() + 1);
    const runOnWeekDay = matchPattern(this.expressions[5], date.getDay());

    return runOnSecond && runOnMinute && runOnHour && runOnDay && runOnMonth && runOnWeekDay;
  }

  apply(date: Date): Date {
    if (this.dtf) {
      return new Date(this.dtf.format(date));
    }

    return date;
  }
}

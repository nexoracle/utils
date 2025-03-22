import { validateExpression } from "./validateExpression";

const validationRegex = /^(?:\d+|\*|\*\/\d+)$/;

function isValidExpression(expression: string, min: number, max: number): boolean {
  const options = expression.split(",");

  for (const option of options) {
    const optionAsInt = parseInt(option, 10);

    if ((!Number.isNaN(optionAsInt) && (optionAsInt < min || optionAsInt > max)) || !validationRegex.test(option)) {
      return false;
    }
  }

  return true;
}

function isInvalidSecond(expression: string): boolean {
  return !isValidExpression(expression, 0, 59);
}

function isInvalidMinute(expression: string): boolean {
  return !isValidExpression(expression, 0, 59);
}

function isInvalidHour(expression: string): boolean {
  return !isValidExpression(expression, 0, 23);
}

function isInvalidDayOfMonth(expression: string): boolean {
  return !isValidExpression(expression, 1, 31);
}

function isInvalidMonth(expression: string): boolean {
  return !isValidExpression(expression, 1, 12);
}

function isInvalidWeekDay(expression: string): boolean {
  return !isValidExpression(expression, 0, 7);
}

function validateFields(patterns: string[], executablePatterns: string[]): void {
  if (isInvalidSecond(executablePatterns[0])) throw new Error(`${patterns[0]} is a invalid expression for second`);

  if (isInvalidMinute(executablePatterns[1])) throw new Error(`${patterns[1]} is a invalid expression for minute`);

  if (isInvalidHour(executablePatterns[2])) throw new Error(`${patterns[2]} is a invalid expression for hour`);

  if (isInvalidDayOfMonth(executablePatterns[3])) throw new Error(`${patterns[3]} is a invalid expression for day of month`);

  if (isInvalidMonth(executablePatterns[4])) throw new Error(`${patterns[4]} is a invalid expression for month`);

  if (isInvalidWeekDay(executablePatterns[5])) throw new Error(`${patterns[5]} is a invalid expression for week day`);
}

export function validatePattern(pattern: string): void {
  if (typeof pattern !== "string") throw new TypeError("pattern must be a string!");

  const patterns = pattern.split(" ");
  const executablePatterns = validateExpression(pattern).split(" ");

  if (patterns.length === 5) patterns.unshift("0");

  validateFields(patterns, executablePatterns);
}

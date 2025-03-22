const months_long = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const months_short = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const week_days_long = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const week_days_short = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function convertAsterisk(expression: string, replacement: string): string {
  if (expression.indexOf("*") !== -1) {
    return expression.replace("*", replacement);
  }
  return expression;
}

function convertAsterisksToRanges(expressions: string[]): string[] {
  expressions[0] = convertAsterisk(expressions[0], "0-59");
  expressions[1] = convertAsterisk(expressions[1], "0-59");
  expressions[2] = convertAsterisk(expressions[2], "0-23");
  expressions[3] = convertAsterisk(expressions[3], "1-31");
  expressions[4] = convertAsterisk(expressions[4], "1-12");
  expressions[5] = convertAsterisk(expressions[5], "0-6");
  return expressions;
}

function convertMonthName(expression: string, items: string[]): string {
  for (let i = 0; i < items.length; i++) {
    expression = expression.replace(new RegExp(items[i], "gi"), (i + 1).toString());
  }
  return expression;
}

function interpreteMonth(monthExpression: string): string {
  monthExpression = convertMonthName(monthExpression, months_long);
  monthExpression = convertMonthName(monthExpression, months_short);
  return monthExpression;
}

function replaceWithRange(expression: string, text: string, init: string, end: string): string {
  const numbers: number[] = [];
  let last = parseInt(end);
  let first = parseInt(init);

  if (first > last) {
    last = parseInt(init);
    first = parseInt(end);
  }

  for (let i = first; i <= last; i++) {
    numbers.push(i);
  }

  return expression.replace(new RegExp(text, "i"), numbers.join(","));
}

function convertRange(expression: string): string {
  const rangeRegEx = /(\d+)-(\d+)/;
  let match = rangeRegEx.exec(expression);
  while (match !== null && match.length > 0) {
    expression = replaceWithRange(expression, match[0], match[1], match[2]);
    match = rangeRegEx.exec(expression);
  }
  return expression;
}

function convertAllRanges(expressions: string[]): string[] {
  for (let i = 0; i < expressions.length; i++) {
    expressions[i] = convertRange(expressions[i]);
  }
  return expressions;
}

function convertSteps(expressions: string[]): string[] {
  const stepValuePattern = /^(.+)\/(\w+)$/;
  for (let i = 0; i < expressions.length; i++) {
    const match = stepValuePattern.exec(expressions[i]);
    const isStepValue = match !== null && match.length > 0;
    if (isStepValue) {
      const baseDivider = match[2];
      if (isNaN(Number(baseDivider))) {
        throw new Error(baseDivider + " is not a valid step value");
      }
      const values = match[1].split(",");
      const stepValues: number[] = [];
      const divider = parseInt(baseDivider, 10);
      for (let j = 0; j < values.length; j++) {
        const value = parseInt(values[j], 10);
        if (value % divider === 0) {
          stepValues.push(value);
        }
      }
      expressions[i] = stepValues.join(",");
    }
  }
  return expressions;
}

function convertWeekDayName(expression: string, items: string[]): string {
  for (let i = 0; i < items.length; i++) {
    expression = expression.replace(new RegExp(items[i], "gi"), i.toString());
  }
  return expression;
}

function convertWeekDays(expression: string): string {
  expression = expression.replace("7", "0");
  expression = convertWeekDayName(expression, week_days_long);
  return convertWeekDayName(expression, week_days_short);
}

function appendSecondExpression(expressions: string[]): string[] {
  if (expressions.length === 5) {
    return ["0"].concat(expressions);
  }
  return expressions;
}

function removeSpaces(str: string): string {
  return str.replace(/\s{2,}/g, " ").trim();
}

function normalizeIntegers(expressions: string[]): string[] {
  for (let i = 0; i < expressions.length; i++) {
    const numbers = expressions[i].split(",").map((num) => parseInt(num, 10));
    expressions[i] = numbers.join(",");
  }
  return expressions;
}

export function validateExpression(expression: string): string {
  let expressions = removeSpaces(expression).split(" ");
  expressions = appendSecondExpression(expressions);
  expressions[4] = interpreteMonth(expressions[4]);
  expressions[5] = convertWeekDays(expressions[5]);
  expressions = convertAsterisksToRanges(expressions);
  expressions = convertAllRanges(expressions);
  expressions = convertSteps(expressions);
  expressions = normalizeIntegers(expressions);

  return expressions.join(" ");
}

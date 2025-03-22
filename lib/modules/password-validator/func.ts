import { regexHandler } from "./config";

interface SchemaContext {
  password: string;
  positive: boolean;
}

function _process(this: SchemaContext, regexp: string | RegExp, repeat?: number): boolean {
  if (repeat && repeat > 1) {
    const parsedRepeat = parseInt(repeat.toString(), 10);
    return new RegExp(regexp + "{" + parsedRepeat + ",}").test(this.password) === this.positive;
  }
  return new RegExp(regexp).test(this.password) === this.positive;
}

export const func = {
  not: function not(this: SchemaContext, symbol?: RegExp | string): boolean {
    this.positive = false;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  has: function has(this: SchemaContext, symbol?: RegExp | string): boolean {
    this.positive = true;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  is: function is(this: SchemaContext): boolean {
    this.positive = true;
    return true;
  },

  min: function min(this: SchemaContext, num: number): boolean {
    return this.password.length >= num;
  },

  max: function max(this: SchemaContext, num: number): boolean {
    return this.password.length <= num;
  },

  digits: function digits(this: SchemaContext, repeat?: number): boolean {
    return _process.call(this, regexHandler.digits, repeat);
  },

  letters: function letters(this: SchemaContext, repeat?: number): boolean {
    return _process.call(this, regexHandler.letters, repeat);
  },

  uppercase: function uppercase(this: SchemaContext, repeat?: number): boolean {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let upperCaseLetters = 0;

      while (upperCaseLetters < repeat && characterIndex < this.password.length) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toLowerCase()) {
          upperCaseLetters++;
        }
        characterIndex++;
      }

      return (upperCaseLetters === repeat) === this.positive;
    }
    return (this.password !== this.password.toLowerCase()) === this.positive;
  },

  lowercase: function lowercase(this: SchemaContext, repeat?: number): boolean {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let lowerCaseLetters = 0;

      while (lowerCaseLetters < repeat && characterIndex < this.password.length) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toUpperCase()) {
          lowerCaseLetters++;
        }
        characterIndex++;
      }

      return (lowerCaseLetters === repeat) === this.positive;
    }
    return (this.password !== this.password.toUpperCase()) === this.positive;
  },

  symbols: function symbols(this: SchemaContext, repeat?: number): boolean {
    return _process.call(this, regexHandler.symbols, repeat);
  },

  spaces: function spaces(this: SchemaContext, repeat?: number): boolean {
    return _process.call(this, regexHandler.spaces, repeat);
  },

  oneOf: function oneOf(this: SchemaContext, list: string[]): boolean {
    return list.indexOf(this.password) >= 0 === this.positive;
  },

  usingPlugin: function usingPlugin(this: SchemaContext, fn: (password: string) => any): boolean {
    try {
      const result = fn.call({}, this.password);
      return Boolean(result) === this.positive;
    } catch (err) {
      return false;
    }
  },
};

export default func;

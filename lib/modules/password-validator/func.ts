import { regexHandler } from "./config";

interface SchemaContext {
  password: string;
  positive: boolean;
}

/**
 * Generic method to test regex
 *
 * @private
 * @param {string} regex - regex to test
 *                           with password
 */
function _process(this: SchemaContext, regexp: string | RegExp, repeat?: number): boolean {
  if (repeat && repeat > 1) {
    const parsedRepeat = parseInt(repeat.toString(), 10);
    return new RegExp(regexp + "{" + parsedRepeat + ",}").test(this.password) === this.positive;
  }
  return new RegExp(regexp).test(this.password) === this.positive;
}

export const func = {
  /**
   * Method to invert the next validations
   *
   * @param {RegExp} [symbol] - custom Regex which should not be present
   */
  not: function not(this: SchemaContext, symbol?: RegExp | string): boolean {
    this.positive = false;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not()
   *
   * @param {RegExp} [symbol] - custom Regex which should be present
   */
  has: function has(this: SchemaContext, symbol?: RegExp | string): boolean {
    this.positive = true;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not() and
   * to make the api readable and chainable
   *
   */
  is: function is(this: SchemaContext): boolean {
    this.positive = true;
    return true;
  },

  /**
   * Method to specify a minimum length
   *
   * @param {number} num - minimum length
   */
  min: function min(this: SchemaContext, num: number): boolean {
    return this.password.length >= num;
  },

  /**
   * Method to specify a maximum length
   *
   * @param {number} num - maximum length
   */
  max: function max(this: SchemaContext, num: number): boolean {
    return this.password.length <= num;
  },

  /**
   * Method to validate the presence of digits
   *
   * @param {number} repeat - count of required digits
   */
  digits: function digits(this: SchemaContext, repeat?: number): boolean {
    return _process.call(this, regexHandler.digits, repeat);
  },

  /**
   * Method to validate the presence of letters
   *
   * @param {number} repeat - count of required letters
   */
  letters: function letters(this: SchemaContext, repeat?: number): boolean {
    return _process.call(this, regexHandler.letters, repeat);
  },

  /**
   * Method to validate the presence of uppercase letters
   *
   * @param {number} repeat - count of required uppercase letters
   */
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

  /**
   * Method to validate the presence of lowercase letters
   *
   * @param {number} repeat - count of required lowercase letters
   */
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

  /**
   * Method to validate the presence of symbols
   *
   * @param {number} repeat - count of required symbols
   */
  symbols: function symbols(this: SchemaContext, repeat?: number): boolean {
    return _process.call(this, regexHandler.symbols, repeat);
  },

  /**
   * Method to validate the presence of space
   *
   * @param {number} repeat - count of required spaces
   */
  spaces: function spaces(this: SchemaContext, repeat?: number): boolean {
    return _process.call(this, regexHandler.spaces, repeat);
  },

  /**
   * Method to provide pre-defined values for password
   *
   * @param {array} list - list of values allowed
   */
  oneOf: function oneOf(this: SchemaContext, list: string[]): boolean {
    return list.indexOf(this.password) >= 0 === this.positive;
  },

  /**
   * Method to run a plugin function for password
   *
   * @param {function} plugin - A plugin function
   */
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

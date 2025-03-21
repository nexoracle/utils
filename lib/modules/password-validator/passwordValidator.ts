import func from "./func";
import { errorHandler } from "./config";
import getValidationMessage from "./message";

interface ValidationProperty {
  method: string;
  arguments: any[];
  description?: string;
}

interface ValidationOptions {
  list?: boolean;
  details?: boolean;
}

interface ValidationDetail {
  validation: string;
  arguments?: any;
  inverted?: boolean;
  message?: string;
}

type ValidationResult = boolean | string[] | ValidationDetail[];

/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
function _validateLength(num: number): void {
  const len = Number(num);
  if (isNaN(len) || !Number.isInteger(len) || len < 1) {
    throw new Error(errorHandler.length);
  }
}

/**
 * Tests a validation and return the result
 *
 * @private
 * @param {ValidationProperty} property - Property to validate
 * @returns {boolean} Boolean value indicting the validity
 *           of the password against the property
 */
function _isPasswordValidFor(this: passwordValidator, property: ValidationProperty): boolean {
  return (func as any)[property.method].apply(this, property.arguments);
}

/**
 * Registers the properties of a password-validation schema object
 *
 * @private
 * @param {string} method - Property name
 * @param {array} arguments - arguments for the func property
 * @returns {passwordValidator}
 */
function _register(this: passwordValidator, method: string, args: IArguments, description?: string): passwordValidator {
  // Add property to the schema
  this.properties.push({ method, arguments: Array.from(args), description });
  return this;
}

type PluginFunction = (password: string) => boolean;

class passwordValidator {
  properties: ValidationProperty[];
  password: string = "";
  positive: boolean = true;
  list: boolean = false;
  details: boolean = false;

  /**
   * Creates a password-validator schema
   *
   * @constructor
   */
  constructor() {
    this.properties = [];
  }

  /**
   * Method to validate the password against schema
   *
   * @param {string} pwd - password to validate
   * @param {object} [options] - optional options to configure validation
   * @param {boolean} [options.list] - asks for a list of validation
   *           failures instead of just true/false
   * @param {boolean} [options.details] - asks for more details about
   *           failed validations including arguments, and error messages
   * @returns {boolean|array} Boolean value indicting the validity
   *           of the password as per schema, if 'options.list' or
   *           'options.details' is not set. Otherwise, it returns an
   *           array of property names which failed validations
   */
  validate(pwd: string, options?: ValidationOptions): ValidationResult {
    this.list = Boolean(options && options.list);
    this.details = Boolean(options && options.details);
    this.password = String(pwd);

    this.positive = true;

    if (this.list || this.details) {
      return this.properties.reduce((errorList: any[], property) => {
        // Applies all validations defined in func one by one
        if (!_isPasswordValidFor.call(this, property)) {
          // If the validation for a property fails,
          // add it to the error list
          let detail: string | ValidationDetail = property.method;
          // If the details option was provided,
          // return a rich object including validation message
          if (this.details) {
            detail = { validation: property.method };
            if (property.arguments && property.arguments[0]) {
              detail.arguments = property.arguments[0];
            }

            if (!this.positive && property.method !== "not") {
              detail.inverted = true;
            }
            const description = property.arguments && property.arguments[1];
            const validationMessage = description || getValidationMessage(property.method, detail.arguments, detail.inverted);
            detail.message = validationMessage;
          }

          return errorList.concat(detail);
        }
        return errorList;
      }, []);
    }
    return this.properties.every(_isPasswordValidFor.bind(this));
  }

  /**
   * Rule to mandate the presence of letters in the password
   *
   * @param {number} [count] - minimum number of letters required
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  letters(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "letters", arguments);
  }

  /**
   * Rule to mandate the presence of digits in the password
   *
   * @param {number} [count] - minimum number of digits required
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  digits(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "digits", arguments);
  }

  /**
   * Rule to mandate the presence of symbols in the password
   *
   * @param {number} [count] - minimum number of symbols required
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  symbols(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "symbols", arguments);
  }

  /**
   * Rule to specify a minimum length of the password
   *
   * @param {number} num - minimum length
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  min(num: number, description?: string): passwordValidator {
    _validateLength(num);
    return _register.call(this, "min", arguments);
  }

  /**
   * Rule to specify a maximum length of the password
   *
   * @param {number} num - maximum length
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  max(num: number, description?: string): passwordValidator {
    _validateLength(num);
    return _register.call(this, "max", arguments);
  }

  /**
   * Rule to mandate the presence of lowercase letters in the password
   *
   * @param {number} [count] - minimum number of lowercase letters required
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  lowercase(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "lowercase", arguments);
  }

  /**
   * Rule to mandate the presence of uppercase letters in the password
   *
   * @param {number} [count] - minimum number of uppercase letters required
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  uppercase(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "uppercase", arguments);
  }

  /**
   * Rule to mandate the presence of space in the password
   * It can be used along with 'not' to not allow spaces
   * in the password
   *
   * @param {number} [count] - minimum number of spaces required
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  spaces(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "spaces", arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'has' is also used
   * to make the api readable and chainable
   *
   * @param {string|RegExp} [pattern] - pattern to match
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  has(pattern?: string | RegExp, description?: string): passwordValidator {
    return _register.call(this, "has", arguments);
  }

  /**
   * Rule to invert the next applied rules.
   * All the rules applied after 'not' will have opposite effect,
   * until 'has' rule is applied
   *
   * @param {string|RegExp} [pattern] - pattern to not match
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  not(pattern?: string | RegExp, description?: string): passwordValidator {
    return _register.call(this, "not", arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'is' is also used
   * to make the api readable and chainable
   *
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  is(): passwordValidator {
    return _register.call(this, "is", arguments);
  }

  /**
   * Rule to whitelist words to be used as password
   *
   * @param {array} list - list of values allowed
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  oneOf(list: string[], description?: string): passwordValidator {
    return _register.call(this, "oneOf", arguments);
  }

  /**
   * Insert a plugin function into the validation chain
   *
   * @param {PluginFunction} fn  - A plugin function
   * @param {string} [description] - description of the validation
   * @returns {passwordValidator} instance of passwordValidator schema
   */
  usingPlugin(fn: PluginFunction, description?: string): passwordValidator {
    if (typeof fn !== "function") {
      throw new Error(errorHandler.invalidPlugin);
    }
    return _register.call(this, "usingPlugin", arguments);
  }
}

export default passwordValidator;

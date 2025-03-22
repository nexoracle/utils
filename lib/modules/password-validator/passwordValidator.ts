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

function _validateLength(num: number): void {
  const len = Number(num);
  if (isNaN(len) || !Number.isInteger(len) || len < 1) {
    throw new Error(errorHandler.length);
  }
}

function _isPasswordValidFor(this: passwordValidator, property: ValidationProperty): boolean {
  return (func as any)[property.method].apply(this, property.arguments);
}

function _register(this: passwordValidator, method: string, args: IArguments, description?: string): passwordValidator {
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

  constructor() {
    this.properties = [];
  }

  validate(pwd: string, options?: ValidationOptions): ValidationResult {
    this.list = Boolean(options && options.list);
    this.details = Boolean(options && options.details);
    this.password = String(pwd);

    this.positive = true;

    if (this.list || this.details) {
      return this.properties.reduce((errorList: any[], property) => {
        if (!_isPasswordValidFor.call(this, property)) {
          let detail: string | ValidationDetail = property.method;

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

  letters(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "letters", arguments);
  }

  digits(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "digits", arguments);
  }

  symbols(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "symbols", arguments);
  }

  min(num: number, description?: string): passwordValidator {
    _validateLength(num);
    return _register.call(this, "min", arguments);
  }

  max(num: number, description?: string): passwordValidator {
    _validateLength(num);
    return _register.call(this, "max", arguments);
  }

  lowercase(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "lowercase", arguments);
  }

  uppercase(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "uppercase", arguments);
  }

  spaces(count?: number, description?: string): passwordValidator {
    count && _validateLength(count);
    return _register.call(this, "spaces", arguments);
  }

  has(pattern?: string | RegExp, description?: string): passwordValidator {
    return _register.call(this, "has", arguments);
  }

  not(pattern?: string | RegExp, description?: string): passwordValidator {
    return _register.call(this, "not", arguments);
  }

  is(): passwordValidator {
    return _register.call(this, "is", arguments);
  }

  oneOf(list: string[], description?: string): passwordValidator {
    return _register.call(this, "oneOf", arguments);
  }

  usingPlugin(fn: PluginFunction, description?: string): passwordValidator {
    if (typeof fn !== "function") {
      throw new Error(errorHandler.invalidPlugin);
    }
    return _register.call(this, "usingPlugin", arguments);
  }
}

export default passwordValidator;

// Inspired By: https://github.com/tarunbatra/password-validator

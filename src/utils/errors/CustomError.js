import errors from './errors.js';

class CustomError {
  static new(errorType) {
    if (!errors.hasOwnProperty(errorType)) {
      throw new Error(`Unknown error type: ${errorType}`);
    }
    
    const { message, statusCode } = errors[errorType];
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }
}

export default CustomError;

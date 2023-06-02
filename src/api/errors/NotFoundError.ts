import CustomError from "./CustomError"

class NotFoundError extends CustomError {
  errorCode = 404
  errorType = "NOTFOUND_ERROR"

  constructor(message: string, private property: string) {
    super(message)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message, property: this.property }]
  }
}

export default NotFoundError

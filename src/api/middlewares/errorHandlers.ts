import { Request, Response, NextFunction } from "express"
import { PostgresError } from "postgres"
import CustomError from "../errors/CustomError"

// Custom error handling middleware function
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.errorCode).send({ errors: err.serializeErrors() })
  }
  if (err instanceof PostgresError) {
    return res.status(500).json({
      errors: [
        {
          message: err.message,
          property: err.constraint_name,
        },
      ],
    })
  }
  res.send("An Oopsie Woopsie Occurred")
}

export default errorHandler

import { Request, Response, NextFunction } from "express"
import { PostgresError } from "postgres"

// Custom error handling middleware function
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err)

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message })
  }

  if (err instanceof PostgresError && err.constraint_name === "email_inx") {
    return res.status(409).json({ message: err.message })
  }

  // Handle 409 Conflict errors
  if (err instanceof ConflictError) {
    return res.status(409).json({ message: err.message })
  }

  // Handle other errors
  return res.status(500).json({ message: "Internal Server Error" })
}

// Custom error class for 404 Not Found
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}

// Custom error class for 409 Conflict
export class ConflictError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ConflictError"
  }
}

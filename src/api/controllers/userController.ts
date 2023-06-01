import { Request, Response } from "express"
import { GetAllUsers, NewUser, insertUser } from "../../db/models"

export const getUsers = async (req: Request, res: Response) => {
  // Retrieve all users from the database or any data source
  const allUsers = await GetAllUsers()
  res.json(allUsers)
}

// POST /users
export const createUser = async (req: Request, res: Response) => {
  // Create a new user in the database or any data source
  const { firstName, lastName, email }: NewUser = req.body

  const newUser = await insertUser({
    firstName,
    lastName,
    email,
  })

  res.status(201).json(newUser)
}

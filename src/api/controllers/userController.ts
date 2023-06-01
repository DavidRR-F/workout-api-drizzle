import { Request, Response } from "express"
import { NewUser, User } from "../../db/models/userModels"
import {
  GetAllUsers,
  GetUser,
  InsertUser,
  UpdateUser,
} from "../../db/queries/userQueries"
import { NotFoundError } from "../middlewares/errorHandlers"

export const getUsers = async (req: Request, res: Response) => {
  // Retrieve all users from the database or any data source
  const allUsers = await GetAllUsers()
  res.json(allUsers)
}

export const getUserById = async (req: Request, res: Response) => {
  const user = await GetUser(Number(req.params.id))
  if (!user) {
    throw new NotFoundError("User not found")
  }
  res.json(user)
}

// POST /users
export const createUser = async (req: Request, res: Response) => {
  // Create a new user in the database or any data source
  const { firstName, lastName, email }: NewUser = req.body

  const newUser = await InsertUser({
    firstName,
    lastName,
    email,
  })

  res.status(201).json(newUser)
}

export const updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id)
  const { firstName, lastName, email }: NewUser = req.body
  const updatedUser = UpdateUser(userId, {
    firstName,
    lastName,
    email,
  })
  if (!updatedUser) {
    throw new NotFoundError("User not found")
  }
  res.json(updatedUser)
}

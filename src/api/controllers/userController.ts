import { Request, Response } from "express"
import { NewUser, User } from "../../db/models/userModels"
import { PostgresError } from "postgres"
import {
  DeleteUser,
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
  try {
    const { firstName, lastName, email }: NewUser = req.body
    const newUser = await InsertUser({
      firstName,
      lastName,
      email,
    })
    res.status(201).json(newUser)
  } catch (error) {
    if (
      error instanceof PostgresError &&
      error.constraint_name === "email_idx"
    ) {
      res.status(409).json({ error: "User with this email already exists" })
    } else {
      res.status(500).json({ error: "Oppsie Woopsie" })
    }
  }
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

export const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id)
  DeleteUser(userId)
  res.status(204).send()
}

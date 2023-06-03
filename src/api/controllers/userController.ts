import { Request, Response } from "express"
import validator from "validator"
import {
  UpsertUser,
  DeleteUser,
  GetAllUsers,
  GetUser,
  InsertUser,
  UpdateUser,
} from "../../db/queries/userQueries"
import NotFoundError from "../errors/NotFoundError"
import ValidationError from "../errors/VailidationError"

export const getUsers = async (req: Request, res: Response) => {
  const allUsers = await GetAllUsers.execute()
  res.json(allUsers)
}

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const user = await GetUser.execute({ id })
  if (!user) {
    throw new NotFoundError(`User ${id} not found`, "id")
  }
  res.json(user)
}

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email }: UpsertUser = req.body
  if (!validator.isEmail(email)) {
    throw new ValidationError("Invalid email format", "email")
  }
  const user = await InsertUser({
    firstName,
    lastName,
    email,
  })
  res.status(201).json(user)
}

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { firstName, lastName, email }: UpsertUser = req.body
  if (!validator.isEmail(email)) {
    throw new ValidationError("Invalid email format", "email")
  }
  const updatedUser = await UpdateUser(id, {
    firstName,
    lastName,
    email,
  })
  if (!updatedUser) {
    throw new NotFoundError(`User ${id} not found`, "id")
  }
  res.json(updatedUser)
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  DeleteUser.execute({ id })
  res.status(204).send()
}

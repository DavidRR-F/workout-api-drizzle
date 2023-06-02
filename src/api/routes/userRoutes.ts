import express, { Request, Response } from "express"
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController"

const router = express.Router()

// GET /users
router.get("/users", getUsers)
// POST /users
router.post("/users", createUser)
// GET /users/:id
router.get("/users/:id", getUserById)
// PATCH /users/:id
router.patch("/users/:id", updateUser)
// DELETE /users/:id
router.delete("/users/:id", deleteUser)

export default router

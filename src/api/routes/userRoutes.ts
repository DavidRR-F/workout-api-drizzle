import express, { Request, Response } from "express"
import { createUser, getUsers } from "../controllers/userController"

const router = express.Router()

// GET /users
router.get("/users", getUsers)

// POST /users
router.post("/users", createUser)

export default router

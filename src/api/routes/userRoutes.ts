import express, { Request, Response } from "express"
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController"

const router = express.Router()

router.get("", getUsers)
router.post("", createUser)
router.get("/:id", getUser)
router.patch("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router

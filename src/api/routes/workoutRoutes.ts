import express from "express"
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from "../controllers/workoutController"

const router = express.Router()

router.get("/:userId/workouts", getWorkouts)
router.post("/:userId/workouts", createWorkout)
router.get("/:userId/workouts/:workoutId", getWorkout)
router.patch("/:userId/workouts/:workoutId", updateWorkout)
router.delete("/:userId/workouts/:workoutId", deleteWorkout)

export default router

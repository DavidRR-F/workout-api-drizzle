import { Router } from "express"
import {
  createExercise,
  deleteExercise,
  getExercise,
  getExercises,
  updateExercise,
} from "../controllers/exerciseController"

const router = Router()

router.get("/:workoutId/exercises", getExercises)
router.post("/:workoutId/exercises", createExercise)
router.get("/:workoutId/exercises/:exerciseId", getExercise)
router.patch("/:workoutId/exercises/:exerciseId", updateExercise)
router.delete("/:workoutId/exercises/:exerciseId", deleteExercise)

export default router

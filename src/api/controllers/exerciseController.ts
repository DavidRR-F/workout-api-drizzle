import { Request, Response } from "express"
import {
  DeleteExercise,
  GetExercise,
  GetExercises,
  InsertExercise,
  UpdateExercise,
  UpsertExercise,
} from "../../db/queries/exerciseQueries"
import NotFoundError from "../errors/NotFoundError"

export const getExercises = async (req: Request, res: Response) => {
  const workoutId = Number(req.params.workoutId)
  const exercises = await GetExercises.execute({ workoutId })
  if (!exercises) {
    throw new NotFoundError(`Workout ${workoutId} Not Found`, "workoutId")
  }
  res.status(200).json(exercises)
}

export const getExercise = async (req: Request, res: Response) => {
  const workoutId = Number(req.params.workoutId)
  const exerciseId = Number(req.params.exerciseId)
  const exercise = await GetExercise.execute({ workoutId, exerciseId })
  if (!exercise) {
    throw new NotFoundError(`Exercise ${exerciseId} Not Found`, "exerciseId")
  }
  res.status(200).json(exercise)
}

export const createExercise = async (req: Request, res: Response) => {
  const workoutId = Number(req.params.workoutId)
  const {
    name,
    sets,
    reps,
    repRangeTop,
    repRangeBottom,
    weight,
    weightIncrease,
  }: UpsertExercise = req.body
  const exercise = await InsertExercise({
    workoutId,
    name,
    sets,
    reps,
    repRangeBottom,
    repRangeTop,
    weight,
    weightIncrease,
  })
  res.status(201).json(exercise)
}

export const updateExercise = async (req: Request, res: Response) => {
  const workoutId = Number(req.params.workoutId)
  const exerciseId = Number(req.params.exerciseId)
  const {
    name,
    sets,
    reps,
    repRangeTop,
    repRangeBottom,
    weight,
    weightIncrease,
  }: UpsertExercise = req.body
  const exercise = await UpdateExercise(exerciseId, {
    workoutId,
    name,
    sets,
    reps,
    repRangeBottom,
    repRangeTop,
    weight,
    weightIncrease,
  })
  if (!exercise) {
    throw new NotFoundError(`Exercise ${exerciseId} Not Found`, "exerciseId")
  }
  res.status(200).json(exercise)
}

export const deleteExercise = async (req: Request, res: Response) => {
  const workoutId = Number(req.params.workoutId)
  const exerciseId = Number(req.params.exerciseId)

  await DeleteExercise.execute({ exerciseId, workoutId })
}

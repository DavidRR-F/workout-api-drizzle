import { Request, Response } from "express"
import {
  Workout,
  UpsertWorkout,
  GetWorkout,
  GetWorkouts,
  InsertWorkout,
  UpdateWorkout,
  DeleteWorkout,
} from "../../db/queries/workoutQueries"
import NotFoundError from "../errors/NotFoundError"

export const getWorkouts = async (req: Request, res: Response) => {
  const id = Number(req.params.userId)
  const allWorkouts: Workout[] = await GetWorkouts.execute({ id })
  if (!allWorkouts) {
    throw new NotFoundError(`User ${id} Not Found`, "id")
  }
  res.json(allWorkouts)
}

export const getWorkout = async (req: Request, res: Response) => {
  const id = Number(req.params.workoutId)
  const userId = Number(req.params.userId)
  const workout = await GetWorkout.execute({ id, userId })
  if (!workout) {
    throw new NotFoundError(`Workout ${id} Not Found`, "id")
  }
  res.json(workout)
}

export const createWorkout = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { name }: UpsertWorkout = req.body
  const workout = await InsertWorkout({ userId, name })
  res.status(201).json(workout)
}

export const updateWorkout = async (req: Request, res: Response) => {
  const id = Number(req.params.workoutId)
  const userId = Number(req.params.userId)
  const { name }: UpsertWorkout = req.body
  const workout = await UpdateWorkout(id, { userId, name })
  res.status(200).json(workout)
}

export const deleteWorkout = async (req: Request, res: Response) => {
  const id = Number(req.params.workoutId)
  const userId = Number(req.params.userId)
  await DeleteWorkout.execute({ id, userId })
}

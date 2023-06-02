import { InferModel } from "drizzle-orm"
import { workouts } from "../schemas/workoutSchema"

export type Workout = InferModel<typeof workouts, "select">
export type UpsertWorkout = InferModel<typeof workouts, "insert">

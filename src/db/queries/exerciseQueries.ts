import { InferModel, eq, placeholder, sql } from "drizzle-orm"
import { exercises } from "../schemas/exerciseSchema"
import { db } from ".."

export type Exercise = InferModel<typeof exercises, "select">
export type UpsertExercise = InferModel<typeof exercises, "insert">

export const GetExercises = db.query.exercises
  .findMany({
    where: eq(exercises.workoutId, placeholder("workoutId")),
  })
  .prepare("GetExercises")

export const GetExercise = db.query.exercises
  .findFirst({
    where: sql`${eq(exercises.workoutId, placeholder("workoutId"))} and ${eq(
      exercises.id,
      placeholder("exerciseId"),
    )}`,
  })
  .prepare("GetExercise")

export const InsertExercise = (exercise: UpsertExercise) => {
  return db.insert(exercises).values(exercise).returning()
}

export const UpdateExercise = (id: number, exercise: UpsertExercise) => {
  return db
    .update(exercises)
    .set({ ...exercise })
    .where(eq(exercises.id, id))
    .where(eq(exercises.workoutId, exercise.workoutId))
    .returning()
}

export const DeleteExercise = db
  .delete(exercises)
  .where(eq(exercises.id, placeholder("exerciseId")))
  .prepare("DeleteExercise")

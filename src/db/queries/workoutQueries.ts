import { eq, placeholder, sql } from "drizzle-orm"
import { db } from ".."
import { UpsertWorkout } from "../models/workoutModels"
import { workouts } from "../schemas/workoutSchema"
import { exercises } from "../schemas/exerciseSchema"
import { users } from "../schemas/userSchema"

export const GetWorkouts = db.query.workouts
  .findMany({
    where: eq(workouts.userId, placeholder("id")),
    with: {
      exercises: {
        where: eq(exercises.workoutId, workouts.id),
      },
    },
  })
  .prepare("GetWorkouts")

export const InsertWorkout = async (workout: UpsertWorkout) => {
  return db.insert(workouts).values(workout).returning()
}

export const GetWorkout = db.query.workouts
  .findFirst({
    where: sql`${workouts.userId} = ${placeholder("userId")} and ${
      workouts.id
    } = ${placeholder("id")}`,
    with: {
      exercises: {
        where: eq(exercises.workoutId, placeholder("id")),
      },
    },
  })
  .prepare("GetWorkout")

export const UpdateWorkout = async (id: number, workout: UpsertWorkout) => {
  return db
    .update(workouts)
    .set({ ...workout })
    .where(eq(workouts.id, id))
    .where(eq(workouts.userId, workout.userId))
    .returning()
  //.prepare("UpdateUser")
}
export const DeleteWorkout = db
  .delete(workouts)
  .where(
    sql`${eq(workouts.id, placeholder("id"))} and ${eq(
      users.id,
      placeholder("userId"),
    )}`,
  )
  .prepare("DeleteWorkout")

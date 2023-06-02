import { eq, placeholder, sql } from "drizzle-orm"
import { db } from ".."
import { UpsertUser } from "../models/userModels"
import { users } from "../schemas/userSchema"
import { workouts } from "../schemas/workoutSchema"
import { exercises } from "../schemas/exerciseSchema"

export const GetAllUsers = db.query.users.findMany().prepare("GetAllUsers")

export const GetUser = db.query.users
  .findFirst({
    where: eq(users.id, placeholder("id")),
    with: {
      workouts: {
        where: eq(workouts.userId, placeholder("id")),
        with: {
          exercises: {
            where: eq(exercises.workoutId, workouts.id),
          },
        },
      },
    },
  })
  .prepare("GetUser")

export const InsertUser = async (user: UpsertUser) => {
  return db.insert(users).values(user).returning()
  //.prepare("InsertUser")
}
export const UpdateUser = async (id: number, user: UpsertUser) => {
  return db
    .update(users)
    .set({ ...user })
    .where(eq(users.id, id))
    .returning()
  //.prepare("UpdateUser")
}
export const DeleteUser = db
  .delete(users)
  .where(eq(users.id, placeholder("id")))
  .prepare("DeleteUser")

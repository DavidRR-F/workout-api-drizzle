import { eq, placeholder, sql } from "drizzle-orm"
import { db } from ".."
import { NewUser, User } from "../models/userModels"
import { users } from "../schemas/userSchema"
import { query } from "express"
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

export const InsertUser = db
  .insert(users)
  .values({
    firstName: placeholder("firstName"),
    lastName: placeholder("lastName"),
    email: placeholder("email"),
  })
  .returning()
  .prepare("InsertUser")

export const UpdateUser = async (id: number, user: NewUser) => {
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

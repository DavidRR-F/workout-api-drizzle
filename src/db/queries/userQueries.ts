import { eq } from "drizzle-orm"
import { db } from ".."
import { NewUser, User } from "../models/userModels"
import { users } from "../schemas/userSchema"
import { query } from "express"

export const GetAllUsers = async () => {
  return await db.query.users.findMany({
    with: {
      workouts: true,
    },
  })
}

export const GetUser = async (id: number) => {
  return await db.select().from(users).where(eq(users.id, id))
}

export const InsertUser = async (user: NewUser) => {
  return await db.insert(users).values(user)
}

export const UpdateUser = async (id: number, userInfo: NewUser) => {
  return await db
    .update(users)
    .set({ ...userInfo })
    .where(eq(users.id, id))
}

export const DeleteUser = async (id: number) => {
  await db.delete(users).where(eq(users.id, id))
}

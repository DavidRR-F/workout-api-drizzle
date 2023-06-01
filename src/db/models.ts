import { InferModel } from "drizzle-orm"
import { users } from "./schema"
import { db } from "./index"

export type User = InferModel<typeof users, "select">

export type NewUser = InferModel<typeof users, "insert">

export const GetAllUsers = async () => {
  return db.select().from(users)
}

export const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user)
}

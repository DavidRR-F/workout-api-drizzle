import { InferModel } from "drizzle-orm"
import { users } from "../schemas/userSchema"

export type User = InferModel<typeof users, "select">
export type NewUser = InferModel<typeof users, "insert">
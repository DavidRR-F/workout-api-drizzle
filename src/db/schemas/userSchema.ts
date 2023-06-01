import { relations } from "drizzle-orm"
import { pgTable, serial, varchar, uniqueIndex } from "drizzle-orm/pg-core"
import { workouts } from "../schemas/workoutSchema"

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    firstName: varchar("firstName", { length: 256 }).notNull(),
    lastName: varchar("lastName", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
  },
  (users) => ({
    emailIndex: uniqueIndex("email_idx").on(users.email),
  }),
)
//one to many with workout
export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
}))

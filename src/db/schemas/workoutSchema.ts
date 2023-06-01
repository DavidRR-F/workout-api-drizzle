import { relations } from "drizzle-orm"
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"
import { users } from "./userSchema"
import { exercises } from "./exerciseSchema"

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  userId: integer("user_id").notNull(),
})
// Many to one with users
// one to many with exercises
export const workoutRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),
  exercises: many(exercises),
}))

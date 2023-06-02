import { relations } from "drizzle-orm"
import {
  pgTable,
  serial,
  varchar,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core"
import { workouts } from "../schemas/workoutSchema"

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  sets: integer("sets").default(3),
  reps: integer("reps").default(12),
  repRangeTop: integer("rep_range_top").default(12),
  repRangeBottom: integer("rep_range_bottom").default(8),
  weight: doublePrecision("weight").default(0.0),
  weightIncrease: doublePrecision("weight_increase").default(2.5),
  workoutId: integer("workout_id")
    .notNull()
    .references(() => workouts.id),
})
// many to many with workouts
// export const exerciseRelations = relations(exercises, ({ one }) => ({
//   workout: one(workouts, {
//     fields: [exercises.workoutId],
//     references: [workouts.id],
//   }),
// }))

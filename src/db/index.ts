import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as dotenv from "dotenv"
import * as user from "./schemas/userSchema"
import * as workout from "./schemas/workoutSchema"
import * as exercise from "./schemas/exerciseSchema"

dotenv.config()

const client = postgres(process.env.DATABASE_URL as string)

export const db = drizzle(client, {
  schema: { ...user, ...workout, ...exercise },
})

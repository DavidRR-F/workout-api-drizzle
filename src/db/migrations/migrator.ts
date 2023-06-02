import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import path from "path"
import postgres from "postgres"
import * as dotenv from "dotenv"

dotenv.config()

const sql = postgres(process.env.DATABASE_URL as string, { max: 1 })
const db = drizzle(sql)

const Migrate = async () => {
  console.log("Migrating Tables...")
  try {
    await migrate(db, { migrationsFolder: path.resolve("src/db/migrations") })
    console.log("Migrations Completed")
    process.exit(0)
  } catch (e) {
    console.log("Migration error:", e)
    process.exit(0)
  }
}
Migrate()

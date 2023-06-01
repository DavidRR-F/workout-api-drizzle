import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import path from "path"
import postgres from "postgres"

const connectionString = "postgres://admin:admin@localhost:5433/mydatabase"
const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql)

migrate(db, { migrationsFolder: path.resolve(".drizzle") })

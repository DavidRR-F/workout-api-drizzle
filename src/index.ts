import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { users } from "./schema"
import { InferModel } from "drizzle-orm"
import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"

const connectionString = "postgres://admin:admin@localhost:5433/mydatabase"

const client = postgres(connectionString)
const db = drizzle(client)

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

type NewUser = InferModel<typeof users, "insert">

const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user)
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" })
})

app.post("/users", async (req, res) => {
  const { firstName, lastName, email }: NewUser = req.body

  const newUser = await insertUser({
    firstName,
    lastName,
    email,
  })

  res.status(201).json(newUser)
})

app.get("/users", async (req, res) => {
  const allUsers = await db.select().from(users)
  res.json(allUsers)
})

app.listen(8080, () => console.log("Server Started on 8080"))

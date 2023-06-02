import express, { Application } from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import "express-async-errors"
import userRoutes from "./api/routes/userRoutes"
import workoutRoutes from "./api/routes/workoutRoutes"
import errorHandler from "./api/middlewares/errorHandlers"

dotenv.config()
const app: Application = express()

// Middleware
app.use(express.json())
app.use(cors())
// Routes
app.use("/users", userRoutes)
app.use("/users", workoutRoutes)

app.use("*", errorHandler)

// Start the server
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

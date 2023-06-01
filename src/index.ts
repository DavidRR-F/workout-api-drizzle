import express, { Application } from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./api/routes/userRoutes"

dotenv.config()
const app: Application = express()

// Middleware
app.use(express.json())
app.use(cors())
// app.use(helmet());
// app.use(morgan('dev'));

// Routes
app.use("/users", userRoutes)

// Error handling middleware
// app.use(errorHandler);

// Start the server
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

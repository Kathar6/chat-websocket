import express from "express"
import mongoose from "mongoose"
import cors from "cors"
// import { bootstrap as bootstrapWs } from "./websockets/server.js"

// Routes
import authRouter from "./routes/auth.js"
import userRouter from "./routes/users.js"

// Middlewares
import responseMiddleware from "./middleware/response.js"

const app = express()

app.use(cors())
app.use(express.json()) // JSON formatter
app.use(express.text()) // Plain text formatter
app.use(responseMiddleware) // Response middleware

// custom routes
app.use(authRouter)
app.use("/user", userRouter)

export const bootstrap = async (port) => {
  await mongoose.connect(process.env.MONGO_URL)
  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
  // bootstraps Websocket server
  // const wsServer = bootstrapWs(server)

  // wsServer.on("connection")
}

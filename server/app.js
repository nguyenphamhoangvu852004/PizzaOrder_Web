import express from "express";
import v1_route from "./routes/v1/v1_route.js"
import cors from "cors"

//express instance
const app = express()

//middleware
app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'DELETE', 'PATCH', 'GET']
}
))
app.use(express.json())

// main route
app.use("/api/v1", v1_route)

export default app



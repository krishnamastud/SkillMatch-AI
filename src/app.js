import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.router.js"
import passport from "./config/passport.js"

const app = express()

app.use(passport.initialize())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)


export default app
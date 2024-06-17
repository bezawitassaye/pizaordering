import express from"express"
import { loginUser,registerUser } from "../controlleers/userController.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

export default userRouter
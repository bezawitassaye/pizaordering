import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import "dotenv/config"
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRouter.js";
const app = express();
const port = 4005;

// Use express.json() middleware as a function
app.use(express.json());
app.use(cors());


connectDB()

app.use("/api/food",foodRouter)
app.use("/image", express.static("uploads"));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(port, () => {
  console.log("server is starting");
});

//mongodb+srv://beza1221love:Baba5678@cluster0.243kmf6.mongodb.net/?
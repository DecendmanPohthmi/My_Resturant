import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import adminRouter from './routes/adminRoutes.js';

const app = express();
const port = 5173

//middleware
app.use(express.json())
// server.js
app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );;

//db connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)

app.get("/", (req, res) => {
    res.send("Nani")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
    
})
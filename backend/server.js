import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

const app = express();
const port = 3000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter)

app.get("/", (req, res) => {
    res.send("Nani")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
    
})
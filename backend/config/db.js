import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://decentpohthmi767:191224@cluster0.0yj01.mongodb.net/my-resturant').then(() => console.log('DB connected')
    )
}
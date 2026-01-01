import mongoose from "mongoose";

const connectDB = async (URI) => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI);
    console.log("✅  MongoDB Connected");
};

export default connectDB;
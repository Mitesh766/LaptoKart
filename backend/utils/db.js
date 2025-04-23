import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database successfully connected")
  } catch (err) {
    console.error(" Cannot connect to the DB:", err.message);
    process.exit(1);
  }
};
export default connectDB;

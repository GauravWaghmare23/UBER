import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Connected to DB");
        }).catch((err) => {
            console.log(err);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default connectToDB;
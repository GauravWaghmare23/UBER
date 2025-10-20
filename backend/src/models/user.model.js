import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Email must be at least 3 characters long"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false
    },
    socketId: {
        type: String,
    }
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;

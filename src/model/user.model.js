import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username cannot exceed 30 characters"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
        maxlength: [50, "Email cannot exceed 50 characters"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please fill a valid email address"],
        trim: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId;
        },
        trim: true,
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [100, "Password cannot exceed 100 characters"]
    },
    googleId: {
        type: String,
        default: null,
    },
    refreshToken: {
        type: String,
        default: null,
    }

},{timestamps: true})


const userModel = mongoose.model("User", userSchema)

export default userModel
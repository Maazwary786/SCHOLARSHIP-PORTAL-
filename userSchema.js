import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Define the email regex pattern for subdomains of iitr.ac.in
const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)*iitr\.ac\.in$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        minLength: [3, "Name must contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [emailPattern, 'Please fill a valid IITR email address.']
    },
    phone: {
        type: Number,
        required: [true, "Please enter your Phone Number"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        maxLength: [32, "Password cannot exceed 32 characters!"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Please select a role"],
        enum: ["Scholarship Seeker", "Scholarship Giver"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Encrypting the password when the user registers or modifies his password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Comparing the user password entered by user with the user saved password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating a JWT token when a user registers or logins
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);

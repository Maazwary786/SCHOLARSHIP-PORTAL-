 import mongoose from "mongoose";
import validator from "validator";
const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)*iitr\.ac\.in$/;

 const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        minLength: [3, "Name must contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
        match: [emailPattern, 'Please fill a valid IITR email address.']
    },
    // incomeCertificate: {
    //     type: String,
    //     required: [false, "Please provide a Income Certificate!"],
    // },
    phone: {
        type: Number,
        required: [true, "Please enter your Phone Number!"],
    },
    address: {
        type: String,
        required: [true, "Please enter your Address!"],
    },
    // markSheet: {
    //     public_id: {
    //         type: String,
    //         required: false,
    //     },
    //     url: {
    //         type: String,
    //         required: false,
    //     },
    //},
    enrollmentNo: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Scholarship Seeker"],
            required: true,
        },
    },
    scholarshipGiverID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Scholarship Giver"],
            required: true,
        },
    },


 });

 export const Application = mongoose.model("Application", applicationSchema); 
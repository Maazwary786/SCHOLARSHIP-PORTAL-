import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minLength: [3, "Title must contain at least 3 Characters!"],
        maxLength: [30, "Title cannot exceed 30 Characters!"],
    },
    // criteria: {
    //     type: String,
    //     required: [true, "Please provide description."],
    //     minLength: [30, "Description must contain at least 30 Characters!"],
    //     maxLength:[500,"Description cannot exceed 10000 Characters!"],

    // },
    // discipline: {
    //     type: String,
    //     required: [true, "Please provide a category"],
    // },
    country: {
        type: String,
        required: [true, "Please provide a country name."],
    },
    city: {
        type: String,
        required: [true, "Please provide a city name."],

    },
    location: {
        type: String,
        required: [true, "Please provide location."],
        minLength: [20, "Location must contain at least 20 characters!"],
        
    },
    // amount: {
    //     type: Number,
    //     minLength: [3, "Amount must contain at least 3 digits."],
    //     maxLength: [9, "Amount cannot exceed 9 digits."],
    // },
    // awardPrize: {
    //     type: String,
    //     minLength: [4,"Award must contain at least 4 digits "],
    //     maxLength: [50, "Award must contain atmost 50 digits"],
    // },
    // duration: {
    //     type: Number,
    //     minLength: [1, "Duration must contain at least 1 digit"],
    //     maxLength: [10, "Duration must contain at most 10 digits"],
    // },
    lastDate: {
        type: Boolean,
        default: false,
    },
    scholarshipPostedOn: {
        type: Date,
        default: Date.now,
    },
    scholarshipPostedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,

    },


});

export const Job = mongoose.model("Job", jobSchema);
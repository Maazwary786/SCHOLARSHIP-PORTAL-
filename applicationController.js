import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

export const postApplication = catchAsyncErrors(async(req, res, next) => {
    const { role } = req.user;
    if (role === "Scholarship Giver") {
        return next(
            new ErrorHandler("Scholarship Giver not allowed to access this resource.", 400)
        );
    }
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return next(new ErrorHandler("Marksheet File Required!", 400));
    // }
    // const { markSheet } = req.files;
    // const allowedFormats = ["image/png","image/jpeg","image/webp"];
    // if (!allowedFormats.includes(markSheet.mimetype)) {
    //     return next(
    //         new ErrorHandler("Invalid file type. Please upload a PNG, jpeg, or webp file.", 400)
    //     );
    // }
    // const cloudinaryResponse = await cloudinary.Uploader.upload(
    //     markSheet.tempFilePath
    // );
    // if (!cloudinaryResponse|| cloudinaryResponse.error){
    //     console.error(
    //         "Cloudinary Error:",
    //         cloudinaryResponse.error || "Unknown Cloudinary error"
    //     );
    //     return next(new ErrorHandler("Failed to Upload Marksheet to Cloudinary", 500));
    // }
    const {name, email,  phone, address, scholarshipId } = req.body;
    const enrollmentNo = {
        user: req.user._id,
        role: "Scholarship Seeker",
    };
    if (!scholarshipId) {
        return next(new ErrorHandler("Scholarship not found!", 404));
    }
    const scholarshipDetails = await Job.findById(scholarshipId);
    if (!scholarshipDetails) {
        return next(new ErrorHandler("Scholarship not found!", 404));
    }

    const scholarshipGiverID = {
        user: scholarshipDetails.scholarshipPostedBy,
        role: "Scholarship Giver",
    };
    if (
        !name ||
        !email ||
       // !incomeCertificate ||
        !phone ||
        !address ||
        !enrollmentNo||
        !scholarshipGiverID)
        //!markSheet
    //) 
    {
        return next(new ErrorHandler("Please fill all fields.", 400));
    }
    const application = await Application.create({
        name,
        email,
       // incomeCertificate,
        phone,
        address,
        enrollmentNo,
        scholarshipGiverID,
        // markSheet: {
        //     public_id: cloudinaryResponse.public_id,
        //     url: cloudinaryResponse.secure_url,
        // },

    });
    res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
});

export const employerGetAllApplications = catchAsyncErrors(
    async(req, res, next) => {
        const {role} = req.user;
        if (role === "Scholarship Seeker") {
            return next(
                new ErrorHandler("Scholarship Seeker not allowed to access this resource.", 400)
            );
        }
        const {_id} = req.user;
        const applications = await Application.find({ "scholarshipGiverID.user": _id});
        res.status(200).json({
            success: true,
            applications,
        });
    }
);

export const scholarshipseekerGetAllApplications = catchAsyncErrors(
    async (req, res, next) => {
        const { role } = req.user;
        if (role === "Scholarship Giver") {
            return next(
                new ErrorHandler("Scholarship Giver not allowed to access this resource.", 400)
            );
        }
        const {_id} = req.user;
        const applications = await Application.find({"enrollmentNo.user": _id});
        res.status(200).json({
            success: true,
            applications,
        });
    }
);  

export const scholarshipseekerDeleteApplication = catchAsyncErrors(
    async (req, res, next) => {
        const { role } = req.user;
        if (role === "Scholarship Giver") {
            return next(
                new ErrorHandler("Scholarship Giver not allowed to access this resource.", 400)
            );
        }
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            return next(new ErrorHandler("OOps, Application not found!", 404));
        }
        await application.deleteOne();
        res.status(200).json({
            success: true,
            message: "Application Deleted!",
        });
    }
);
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncErrors(async(req, res, next) =>{
    const jobs = await Job.find({expired: false});
    res.status(200).json({
        success: true,
        jobs,
    });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
    const {role} = req.user;
    if (role === "Scholarship Seeker") {
        return next(
            new ErrorHandler("Scholarship Seeker not allowed to access this resource." , 400)
        );
    }
    const {
        title,
        // criteria,
        discipline,
        country,
        city,
        location,
        // amount,
        // awardPrize,
        // duration,
        
    } = req.body;
    if (!title||!discipline||!country||!city||!location){
        return next(new ErrorHandler("Please provide full job details.", 400));
    }

    // if ((!amount||!awardPrize) && !duration){
    //     return next(
    //         new ErrorHandler(
    //             "Please either provide amount or awardPrize.",
    //             400
    //         )
    //     );
    // }

    // if (amount && awardPrize && duration){
    //     return next(
    //         new ErrorHandler("Cannot Enter amount and awardPrize together.",400)
    //     );
    // }

    const scholarshipPostedBy = req.user._id;
    const job = await Job.create({
        title,
        // criteria,
        // discipline,
        country,
        city,
        location,
        // amount,
        // awardPrize,
        // duration,
        scholarshipPostedBy,
    });
    res.status(200).json({
        success: true,
        message: "Scholarship Posted Successfully!",
        job,
    });
});

export const getMyJobs = catchAsyncErrors(async(req, res, next) => {
    const {role} = req.user;
    if (role === "Scholarship Seeker") {
        return next(
            new ErrorHandler("Scholarship Seeker is not allowed to access this resource.", 400)
        );
    }

    const myJobs = await Job.find ({ scholarshipPostedBy: req.user._id});
    res.status(200).json({
        success:true,
        myJobs,
    });
});

export const updateJob = catchAsyncErrors(async(req, res, next)=>{
    const {role} = req.user;
    if (role === "Scholarship Seeker") {
        return next(
            new ErrorHandler("Scholarship Seeker not allowed to access this resource.", 400)
        );
    }

    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("OOPS! Scholarship not found.", 404));

    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Job Updated!",
    }); 
});

export const deleteJob = catchAsyncErrors(async(req, res, next) => {
    const {role}= req.user;
    if (role === "Scholarship Seeker") {
        return next(
            new ErrorHandler("Scholarship Seeker not allowed to access this resource.", 400)
        );
    }
    const {id} = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("OOPS! Scholarship not found.", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Scholarship Deleted!",
    });
});

export const  getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Scholarship not found.", 404));
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch(error) {
        return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
});

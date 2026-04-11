 import {catchAsyncErrors} from "../midleware/catchAsyncErrors.js";
import ErrorHandler from "../midleware/errorMidleware.js";
import {User} from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const registerPateint = catchAsyncErrors(async(req,res, next)=>{
    const{firstName, lastName, email, phone, nic, dob, gender, password, role, docDepartment} = req.body;
    if(
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password){
        return next(new ErrorHandler("Please enter all fields", 400));
    }   

    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Patient",
    });


    generateToken(user, "User Registered", 200, res);
    
})

export const login = catchAsyncErrors(async (req, res, next)=>{
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Passwords do not match", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 404));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 404));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role is not found", 400));
    }
    
    generateToken(user, "User logged in successfully", 200, res);
  
})

export const addNewAdmin = catchAsyncErrors(async(req, res, next)=>{
    const{firstName, lastName, email, phone, nic, dob, gender, password} = req.body;
    if(
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password){
        return next(new ErrorHandler("Please enter all fields", 400));
    }   

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next (new ErrorHandler(`${isRegistered.role} with this email already exists`, 400));
    }
    const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin"
    })
    res.status(200).json({
        success:true,
        message: "Admin added successfully",
    });
})

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    });
})

export const getUsersDetails= catchAsyncErrors(async(req,res,next)=>{
    const user= req.user;
    res.status(200).json({
        success:true,
        user
    })
})

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json(
        {
            success:true,
            message:"admin logout sucessfully"
        }
    )
})

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json(
        {
            success:true,
            message:"patient logout sucessfully"
        }
    )
})

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});

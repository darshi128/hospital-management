import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName:{
        required:true,
        type:String,
        minLength:[3,"First Name must be at least 3 characters"],
    },
    lastName:{
        required:true,
        type:String,    
        minLength:[3,"Last Name must be at least 3 characters"],
    },
    email:{ 
        required:true,
        type:String,
        validate:[validator.isEmail,"Please enter a valid email address"],
    },      
    phone:{
        required:true,
        type:String,
        minLength:[10,"Phone number must be at least 10 characters"],
        maxLength:[10,"Phone number must be at most 10 characters"],
    },
    nic:{
        required:true,
        type:String,        
        minLength:[13,"NIC must be of 13 digits"],
        maxLength:[13,"NIC must be of 13 digits"],
    },
    dob:{
        type:Date,
        required:[true,"Date of birth is required"],
    },
    gender:{
        type:String,
        required:true,
        enum :["Male","Female"],
    },
    password:{
        required:true,
        type:String,
        minLength:[8,"Password must be at least 8 characters"],
        select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Patient","Doctor","Admin"],
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id:String,
        url:String,
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    });
}

export const User = mongoose.model("User",userSchema);
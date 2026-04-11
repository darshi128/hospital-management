import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message:{
        required:true,
        type:String,        
        minLength:[10,"Message must be at least 10 characters"],
    }
})

export const Message = mongoose.model("Message",messageSchema);
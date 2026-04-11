import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
       appointment_date:{
        type:Date,
        required: true
       },
       department:{
        type:String,
        required: true
       },
       doctor:{
         firstName:{
            type:String,
            required:true,
         },
         lastName:{
            type:String,
            required:true,
        }
       },
        hasVisited: {
         type: Boolean,
          default: false,
     },
       doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
       },
       patientId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
       },
       address:{
        type:String,
        required:true,
       },
       status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
       }
       
})

export const Appointment = mongoose.model("Appointment", appointmentSchema);
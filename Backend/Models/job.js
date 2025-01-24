import { application } from "express";
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    requirement:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    ExperienceLevel:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobtype:{
        type:String,
        required:true,
    },
    Position:{
        type:Number,
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    application:[
        {
            type:String,
            ref:'Application',
        }
    ]
},{timestamps:true});

const Job = mongoose.model('Job',JobSchema);
export default  Job;
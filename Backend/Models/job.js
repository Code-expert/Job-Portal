import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    }
})
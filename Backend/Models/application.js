
import mongoose from "mongoose";

const ApplicatonSchema =  new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:'true',
    },
    Applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending',
    }
},{timestamps:true});
const Application = mongoose.model('Application',ApplicatonSchema);
export default Application;
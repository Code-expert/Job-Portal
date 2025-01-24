import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true});
const Company  = mongoose.model('Company',CompanySchema);
export default Company;
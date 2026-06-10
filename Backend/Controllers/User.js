import  User  from '../Models/User.js'
import bcrypt from   "bcryptjs"
import jwt from "jsonwebtoken";
import getDataUri from '../Connection/datauri.js';
import cloudinary from '../Connection/cloudinary.js';

export const register = async (req,res) => {
    try {
        const {Fullname,Email,PhoneNumber,Password,Role} = req.body;
        if(!Fullname||!Email||!PhoneNumber||!Password||!Role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };

        const file = req.file;
        const fileUri = getDataUri(file);   
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content); 

        
        
        const user = await User.findOne({Email});
        if(user){
            return res.status(400).json({
                message:"User already Exists with this Email",
                success:false,
            })
        };
        const hashedPassword = await bcrypt.hash(Password,10);
        
        await User.create({
            Fullname,
            Email,
            PhoneNumber,
            Password:hashedPassword,
            Role,
            Profile:{
                ProfilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message:"Account created Successfully",
            success:"true"
        })
    } catch (error) {
        console.log("Registration Error",error);
    }
    
}
export const login = async (req,res) => {
    try {
        const {Email,Password,Role} = req.body;
        
        if (!Email||!Password||!Role) {
            return res.status(400).json({
                message:"All Fields are required",
                success:false
            })              
        }
        let user = await User.findOne({Email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect Email or Password",
                success:false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(Password,user.Password);
        if (!isPasswordMatch) {
            return  res.status(400).json({
                message:"Innvalid Email or Password",
                success:false,
            })
        }
        if (Role!==user.Role) {
          return res.status(400).json({
            message:"Account doesn't Exist with current Role",
            success:false,
          })  
        };

        const tokenData = {
            userid:user._id,
            Fullname:user.Fullname,
            Email:user.Email,
            PhoneNumber:user.PhoneNumber,
            Role:user.Role,
            Profile:user.Profile,
        }

        const token  = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        user={
            _id:user._id,
            Fullname:user.Fullname,
            Email:user.Email,
            PhoneNumber:user.PhoneNumber,
            Role:user.Role,
            Profile:user.Profile,
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true , sameSite:'strict'}).json({
            message:`Welcome Back ${user.Fullname}`,
            user,
            success:true,
        });

    } catch (error) {
        console.log("Login error",error)
    }
}
export const logout = async  (req,res) =>{
   try {
    return res.status(201).cookie("token","", {maxAge:0}).json({
        message:"Logout Succesfully",
        success:true,
    });
   } catch (error) {
    console.log("Logout error",error);
   }
};
// In your updateProfile function (backend)
export const updateProfile = async (req, res) => {
    try {
        const { Fullname, Email, PhoneNumber, bio, skills } = req.body;
        const file = req.file;

        let cloudResponse = null;
        if (file) {
            const fileUri = getDataUri(file);

            // ✅ Ensure PDFs are uploaded as "raw" type
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: file.mimetype === "application/pdf" ? "raw" : "auto",
                public_id: `resumes/${req.id}_${Date.now()}`
            });

            console.log("Cloudinary Upload Response:", cloudResponse); // Debugging
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
            });
        }

        // 🔹 Updating user data
        if (Fullname) user.Fullname = Fullname;
        if (Email) user.Email = Email;
        if (PhoneNumber) user.PhoneNumber = PhoneNumber;
        if (bio) user.Profile.bio = bio;
        if (skills) user.Profile.skills = skillsArray;

        if (cloudResponse) {
            user.Profile.resume = cloudResponse.secure_url;
            user.Profile.ResumeoriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            Fullname: user.Fullname,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            Role: user.Role,
            Profile: user.Profile,
        };

        return res.status(201).json({
            message: "Profile Updated successfully",
            user,
            success: true,
        });

    } catch (error) {
        console.log("updateProfile Error", error);
    }
};

export const toggleSaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isSaved = user.Profile.savedJobs?.some(id => id.toString() === jobId);

        if (isSaved) {
            // Unsave
            user.Profile.savedJobs = user.Profile.savedJobs.filter(id => id.toString() !== jobId);
        } else {
            // Save
            if(!user.Profile.savedJobs) user.Profile.savedJobs = [];
            user.Profile.savedJobs.push(jobId);
        }

        await user.save();

        return res.status(200).json({
            message: isSaved ? "Job removed from saved list" : "Job saved successfully",
            savedJobs: user.Profile.savedJobs,
            success: true
        });

    } catch (error) {
        console.log("toggleSaveJob error", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
import  User  from '../Models/User.js'
import bcrypt from   "bcryptjs"
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
    try {
        const {Fullname,Email,PhoneNumber,Password,Role} = req.body;
        console.log(Fullname,Email,PhoneNumber,Password,Role);
        if(!Fullname||!Email||!PhoneNumber||!Password||!Role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
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
export const updateProfile = async (req,res) =>{
    try {
        const {Fullname,Email,PhoneNumber,bio,skills} = req.body;
        let skillsArray;
        if (skills) {
             skillsArray = skills.split(",");
        }
       
        const userId = req.id;

        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User does not exist",
                success:false,
            })
        }
        //updating the data
        if(Fullname) user.Fullname=Fullname
        if(Email) user.Email=Email
        if(PhoneNumber) user.PhoneNumber=PhoneNumber
        if(bio) user.Profile.bio= bio
        if(skills) user.Profile.skills=skillsArray

        await user.save();

        user={
            _id:user._id,
            Fullname:user.Fullname,
            Email:user.Email,
            PhoneNumber:user.PhoneNumber,
            Role:user.Role,
            Profile:user.Profile,
        }

        return res.status(201).json({
            message:"Profile Updated  succesfully ",
            user,
            success:true,
        });

    } catch (error) {
        console.log("updateProfile Error",error);
    }
}
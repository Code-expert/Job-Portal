import Company from '../Models/Company.js';

export const registerCompany = async (req,res) =>{
    try {
        const {companyName} = req.body;
        if (companyName) {
            return res.status(400).json({
                message:"Company Name is required",
                success:false,
            })
        }
        let company = await Company.findOne({companyName});
        if (company) {
            return res.status(400).json({
                message:"Company already exists with this name",
                success:false,
            })
        }
        await Company.create({
            name:companyName,
            description:req.body.description,
            website:req.body.website,
            location:req.body.location,
            logo:req.body.logo,
            userId:req.id,
        });
        return res.status(201).json({
            message:"Company Registered Successfully",
            success:true,
        });S
    } catch (error) {
       console.log("Register Company error",error); 
    }
};
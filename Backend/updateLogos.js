import mongoose from "mongoose";
import dotenv from "dotenv";
import Company from "./Models/Company.js";

dotenv.config();

const updateLogos = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for updating logos...");

        const companies = await Company.find({});
        for (const company of companies) {
            const isFormal = ["Google", "Microsoft", "Amazon", "Facebook", "Apple", "Netflix", "Tesla", "TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Cognizant", "Accenture", "IBM", "Oracle", "SAP", "Salesforce", "Adobe", "Intel", "Airbnb", "Uber", "Stripe"].includes(company.companyName);
            
            let logoUrl;
            if (isFormal) {
                // clearbit needs the domain
                let domain = company.companyName.toLowerCase().replace(/\s+/g, '') + ".com";
                if(company.companyName === "TCS") domain = "tcs.com";
                if(company.companyName === "Apple") domain = "apple.com";
                if(company.companyName === "Facebook") domain = "meta.com";
                
                // Clearbit provides beautiful real logos!
                logoUrl = `https://logo.clearbit.com/${domain}`;
            } else {
                // UI Avatars generates a beautiful colored icon with the company initials!
                logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.companyName)}&background=random&color=fff&size=128&bold=true`;
            }

            company.logo = logoUrl;
            await company.save();
        }

        console.log(`Successfully updated stunning logos for ${companies.length} companies!`);
        process.exit(0);
    } catch (error) {
        console.error("Error updating logos:", error);
        process.exit(1);
    }
}

updateLogos();

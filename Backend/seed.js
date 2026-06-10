import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./Models/job.js";
import User from "./Models/User.js";
import Company from "./Models/Company.js";

dotenv.config();

const formalTitles = ["Frontend Developer", "Backend Engineer", "Full Stack Developer", "Data Scientist", "Product Manager", "DevOps Engineer", "UI/UX Designer", "Machine Learning Engineer", "Cloud Architect", "QA Engineer", "Mobile App Developer", "Cybersecurity Analyst", "Business Analyst", "Marketing Specialist", "HR Manager", "Blockchain Developer", "SRE Engineer"];
const informalTitles = ["Professional Plumber", "Master Electrician", "Carpenter", "House Painter", "Mason", "Welder", "Mechanic", "Driver", "Security Guard", "Cleaner", "Gardener", "Construction Worker", "Delivery Executive", "Chef", "Tailor", "HVAC Technician", "Roofer"];
const formalCompanies = ["Google", "Microsoft", "Amazon", "Facebook", "Apple", "Netflix", "Tesla", "TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Cognizant", "Accenture", "IBM", "Oracle", "SAP", "Salesforce", "Adobe", "Intel", "Airbnb", "Uber", "Stripe"];
const informalCompanies = ["Urban Company", "Local Services Hub", "City Maintenance Pro", "QuickFix Repairs", "Home Help Co.", "Elite Plumbers", "Safe Security", "Green Gardens", "Pro Cleaners", "Fast Movers", "Apex Construction", "City Transit", "Spark Electrics"];
const locations = ["Bangalore", "Pune", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Kolkata", "Remote", "Gurugram", "Noida", "Ahmedabad", "Jaipur"];
const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for bulk seeding...");

        // Get a user to act as creator
        const user = await User.findOne({ Role: 'recruiter' });
        if (!user) {
            console.error("No recruiter user found! Please create a recruiter user first.");
            process.exit(1);
        }

        // Create companies
        let companies = [];
        const allCompanyNames = [...formalCompanies, ...informalCompanies];
        for (const cName of allCompanyNames) {
            let comp = await Company.findOne({ companyName: cName });
            if (!comp) {
                // Generate a random logo for aesthetics
                const logoNum = randomInt(1, 99);
                comp = await Company.create({
                    companyName: cName,
                    description: `A highly reputed enterprise operating in the ${formalCompanies.includes(cName) ? 'corporate' : 'services'} sector.`,
                    location: random(locations),
                    logo: `https://randomuser.me/api/portraits/lego/${logoNum > 9 ? logoNum : '1'}.jpg`,
                    userId: user._id
                });
            }
            companies.push(comp);
        }
        console.log(`Ensured ${companies.length} companies exist in the DB.`);

        let jobs = [];
        for (let i = 0; i < 200; i++) {
            // Split evenly 100 formal, 100 informal
            const isFormal = i < 100;
            const sector = isFormal ? "formal" : "informal";
            const title = isFormal ? random(formalTitles) : random(informalTitles);
            
            const companyPool = companies.filter(c => isFormal ? formalCompanies.includes(c.companyName) : informalCompanies.includes(c.companyName));
            const company = random(companyPool);
            
            let salary;
            if (isFormal) {
                salary = (Math.random() * 35 + 4).toFixed(1); // 4.0 to 39.0 LPA
            } else {
                salary = (Math.random() * 8 + 1).toFixed(1); // 1.0 to 9.0 LPA equivalent
            }

            jobs.push({
                title: `${title} (ID-${randomInt(1000, 9999)})`,
                description: `We are looking for a highly skilled ${title} to join our team at ${company.companyName}. If you have a passion for delivering excellence and working with a dynamic team, this role is for you.`,
                requirement: [random(["React", "Node.js", "Python", "Plumbing", "Wiring", "Logistics"]), random(["Communication", "Teamwork", "Problem Solving", "Hardworking"]), "2+ Years Experience", random(["Agile", "Adaptability", "Time Management"])],
                salary: salary,
                ExperienceLevel: `${randomInt(1, 10)} Years`,
                location: random(locations),
                jobtype: random(jobTypes),
                Position: `${randomInt(1, 50)}`,
                sector: sector,
                company: company._id,
                createdBy: user._id
            });
        }

        await Job.insertMany(jobs);
        console.log(`Successfully generated and seeded 200 jobs!`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding DB:", error);
        process.exit(1);
    }
}

generateJobs();

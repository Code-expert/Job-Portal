import  express  from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoDb from './Connection/connect.js';
import userRouter from './Routes/User.js';
import companyRouter from './Routes/Company.js';
import jobRouter from './Routes/Job.js';
import applicationRouter from './Routes/Application.js';
import path from 'path';
dotenv.config({});
const app = express();

//Middlewares...
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
  origin: ["http://localhost:5173"], // Allow frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies
};

app.use(cors(corsOptions));



const PORT =process.env.PORT||3000;

app.use('/api/v1/user',userRouter);
app.use('/api/v1/company',companyRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/application',applicationRouter);

if(process.env.NODE_ENV === 'production'){
  const dirpath = path.resolve();
  app.use(express.static('Frontend/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirpath,'Frontend','build','index.html'));  
  });
}



app.listen(PORT, () => {
  mongoDb();
  console.log(`Server is running on port ${PORT}`);
});
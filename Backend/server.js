import  express  from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoDb from './Connection/connect.js';
import userRouter from './Routes/User.js';
const app = express();
dotenv.config({});


  

//Middlewares...
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));



const PORT =process.env.PORT||3000;

app.use('/api/v1/user',userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  mongoDb();
  console.log(`Server is running on port ${PORT}`);
});
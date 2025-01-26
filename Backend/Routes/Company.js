import express from "express";
import {registerCompany,getCompanies,getCompanyById,updateCompany} from "../Controllers/Company.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
const Router = express.Router();

Router.route('/register')
      .post(isAuthenticated,registerCompany);
Router.route('/get')
      .post(isAuthenticated,getCompanies);
Router.route('/get/:id')
      .get(isAuthenticated,getCompanyById);
Router.route('/update/:id')
      .post(isAuthenticated,updateCompany);      

export default Router;
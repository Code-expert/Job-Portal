import express from "express";
import {applyJobs,getApplications,getAppliedJobs,updateStatus} from "../Controllers/Application.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
const Router = express.Router();

Router.route('/apply')
      .post(isAuthenticated,applyJobs);
Router.route('/getapplications')
      .get(isAuthenticated,getApplications);
Router.route('/getjobs')
      .get(isAuthenticated,getAppliedJobs);
Router.route('/update')
      .put(isAuthenticated,updateStatus);      

export default Router;
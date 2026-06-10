import express from "express";
import { login, logout, register, updateProfile, toggleSaveJob } from "../Controllers/User.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { singleUpload } from "../Middlewares/multer.js";
const Router = express.Router();

Router.route('/register')
      .post(singleUpload,register)
Router.route('/login')
      .post(login)
Router.route('/logout')
      .get(logout)
Router.route('/profile/update')
      .post(singleUpload,isAuthenticated,updateProfile);

Router.route('/job/save/:id')
      .post(isAuthenticated, toggleSaveJob);

export default Router;
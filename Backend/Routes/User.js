import express from "express";
import { login, logout, register, updateProfile } from "../Controllers/User.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
const Router = express.Router();

Router.route('/register')
      .post(register)
Router.route('/login')
      .post(login)
Router.route('/logout')
      .get(logout)
Router.route('/profile/update')
      .post(isAuthenticated,updateProfile)      

export default Router;
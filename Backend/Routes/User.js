import express from "express";
import { login, register, updateProfile } from "../Controllers/User";
import isAuthenticated from "../Middlewares/isAuthenticated";
const Router = express.Router();

Router.route('/register')
      .post(register)
Router.route('/login')
      .post(login)
Router.route('/profile/update')
      .post(isAuthenticated,updateProfile)      

export default Router;
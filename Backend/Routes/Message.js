import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { getMessages, sendMessage, getChatUsers } from "../Controllers/Message.js";

const router = express.Router();

router.route("/users").get(isAuthenticated, getChatUsers);
router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessages);

export default router;

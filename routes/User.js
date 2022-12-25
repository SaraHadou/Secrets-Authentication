import express from "express";

import { getHomePage, register, login, createUser, loginUser } from '../controllers/User.js';

const router = express.Router();

router.get("/", getHomePage);
router.get("/register", register);
router.get("/login", login);
router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
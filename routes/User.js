import express from "express";

import { getHomePage, register, login, logout,  getSecrets, createUser, loginUser } from '../controllers/User.js';

const router = express.Router();

router.get("/", getHomePage);
router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);
router.get("/secrets", getSecrets);
router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
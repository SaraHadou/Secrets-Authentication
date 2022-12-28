import express from "express";

import { getHomePage,  register, login, logout, getSecrets, createUser, loginUser } from '../controllers/User.js';
import { authGoogle, authGoogleFailure, authGoogleGetSecrets } from '../controllers/User.js';

const router = express.Router();

router.get("/", getHomePage);
router.get("/auth/google", authGoogle);
router.get('/auth/google/secrets', authGoogleFailure, authGoogleGetSecrets);
router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);
router.get("/secrets", getSecrets);
router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
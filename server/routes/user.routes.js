import express from "express";
import {
  checkAuth,
  loginUser,
  logout,
  registerUser,
  userAuth,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/is-auth", userAuth, checkAuth);

router.get("/logout", authUser, logout);

export default router;

import express from "express";
import UserModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticationMiddleware } from "../middleware/index.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // check if the user already exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // create the user
    await UserModel.create(req.body);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // compare the password
    const passwordsMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordsMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create a jwt token and return it
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res
      .status(200)
      .json({ token, message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/current-user", authenticationMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/all-users", authenticationMiddleware, async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password")
      .sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

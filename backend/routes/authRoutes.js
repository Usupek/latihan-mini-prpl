import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

router.get("/user", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: "ini daftar semua user ya ngab",
      data: users,
      count: users.length
    })
  } catch (error) {
    res.status(500).json({
      message:"gagal ngambil data user ngab",
      error: error.message
    }) 
  }
})

router.post("/register", async (req, res) => {
  try {
    const {email, username, password} = req.body; 
    if(!username || !email || !password){
      return res.status(400).json({message: "isi semua fields nya ngab"});
    }
    
    const existingEmail = await User.findOne({email});
    if(existingEmail) return res.status(400).json({message: "email nya udah kepake ngab"});

    const existingUsername = await User.findOne({username});
    if(existingUsername) return res.status(400).json({message: "username nya udah ada ngab"});

    const user = new User({
      email, username, password
    });
    await user.save();

    // gen token
    const token = signToken(user);

    res.status(201).json({
      message: "register sukses ngab",
      token,
      user: {
        id: user._id, username: user.username,
        email: user.email, role: user.role
      }
    });

  } catch (error) {
    console.log("error in register route", error);
    res.status(500).json({message: "internal server error"});
  }
});

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message: "isi semua field nya ngab"});
    }

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({
      message: "invalid credentials"
    })
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect)return res.status(400).json({message: "invalid credentials"});

    // gen token
    const token = signToken(user);

    res.status(200).json({
      message:"login success",
      token,
      user: {
        id: user._id, username: user.username,
        email: user.email, role: user.role
      }
    })
  } catch (error) {
    console.log("error in login route", error);
    res.status(500).json({message: "internal server error"});
  }
});

import { protect } from "../middleware/authMiddleware.js";
router.get("/me", protect, async (req, res) => {
  res.status(200).json({ user: req.user });
});


export default router;

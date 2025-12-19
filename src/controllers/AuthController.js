import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Company from "../models/Company.js";



export const login = async (req, res) => {
  try {
    const { companyId, username, password } = req.body;

    if (!companyId || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Company, username and password are required",
      });
    }

    //  Validate input
     if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid companyId",
      });
    }

    const company = await Company.findById(companyId);
    // Check user exists
    const user = await User.findOne({ companyId, username }).select("+password");
    if (!user) {
      return res.status(401).json({
        success : "false",
        message: "Invalid credentials",
      });
    }

    //  Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success : "false",
        message: "Account is deactivated",
      });
    }

    //  Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: "false",
        message: "Invalid email or password",
      });
    }

    //  Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        userId: user.companyId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6 Response
    res.status(200).json({
      success: "true",
      token: token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        companyId : user.companyId,
        companyName : company.companyName ?? '',
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const register = async (req, res) => {
  try {
    const { companyId, username, email, password, role } = req.body;
    //  Validate input
    if (!companyId || !username || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } 
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: "Email already in use",
      });
    } 
    // Create user
    const newUser = new User({
      companyId,
      username,
      email,
      password,
      role,
    });
    await newUser.save(); 
    res.status(201).json({
      message: "User registered successfully",
    });
  } 
  catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
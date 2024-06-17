import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/usermodel.js";
import { request } from "https";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.jwt_secret);
};

const registerUser = async (req, res) => {
    try {
        // Check if a user with the provided email already exists
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(req.body.email)) {
            return res.json({ success: false, message: "Please enter valid email" });
        }

        if (req.body.password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { registerUser, loginUser };

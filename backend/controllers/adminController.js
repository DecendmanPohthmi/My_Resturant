import adminModel from "../models/adminModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create Token Function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register Admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if admin already exists
        const exist = await adminModel.findOne({ email });
        if (exist) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate strong password (At least 8 characters, 1 number)
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0 })) {
            return res.status(400).json({ success: false, message: "Please enter a strong password (at least 8 characters and 1 number)" });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptPassword = await bcrypt.hash(password, salt);

        // Create and save new admin
        const newAdmin = new adminModel({
            name,
            email,
            password: encryptPassword
        });

        const admin = await newAdmin.save();
        const token = createToken(admin._id);

        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// Login Admin
const loginAdmin = async (req, res) => {
    const { identityID, password } = req.body;

    try {
        // Check if admin exists
        const admin = await adminModel.findOne({ identityID });
        if (!admin) {
            return res.status(400).json({ success: false, message: "Invalid identityID " });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid  password" });
        }

        // Generate token
        const token = createToken(admin._id);
        res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export { loginAdmin, registerAdmin };

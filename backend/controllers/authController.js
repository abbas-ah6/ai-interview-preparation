const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// @dec     Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        console.log("Registering user:", email);

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already in use." });
        }

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// @dec     Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res
                .status(500)
                .json({ message: "Invalid Email or Password", });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res
                .status(500)
                .json({ message: "Password is incorrect.", })
        }

        // Return User with jwt
        res
            .status(200)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id)
            });

    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message, })
    }
}

// @dec     Get user information
// @route   GET /api/auth/profile
// @access  Private (Requires JWT)
const getUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
           return res
                .status(400)
                .json({ message: "User not found.", });
        }

        res
            .status(200)
            .json(user)

    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error.", error: error.message, })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
}   
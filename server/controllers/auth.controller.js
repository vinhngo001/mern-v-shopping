const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model');
const ResponseDTO = require("../dtos/response.dto");
const GenerateToken = require('../helpers/generateToken.helper');

const authController = {
    register: async (req, res) => {
        const responseDTO = new ResponseDTO();
        const { username, email, password } = req.body

        // Simple validation
        if (!email || !username || !password)
            return res.status(400).json(responseDTO.badRequest('Missing username and/or password'));

        try {
            // Check for existing user
            const user = await userModel.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });

            if (user) return res.status(400).json(responseDTO.badRequest('Username or email already taken'))

            // All good
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new userModel({ username, email, password: hashedPassword });
            await newUser.save();

            // Return token
            const generateToken = new GenerateToken();
            const accessToken = generateToken.accessToken({ userId: newUser._id });
            generateToken.refreshToken({ userId: newUser._id }, res)

            res.status(200).json(responseDTO.success('User created successfully', {
                user: { ...newUser._doc, password: "" },
                accessToken
            }))
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message })
        }
    },
    login: async (req, res) => {
        const responseDTO = new ResponseDTO();
        const { account, password } = req.body

        // Simple validation
        if (!account || !password)
            return res.status(400).json(responseDTO.badRequest('Missing account and/or password'))

        try {
            // Check for existing user
            const user = await userModel.findOne({ $or: [{ email: account }, { username: account }] })
            if (!user)
                return res.status(400).json(responseDTO.badRequest('Incorrect account or password'))

            // Username found
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid)
                return res.status(400).json(responseDTO.badRequest('Incorrect account or password'))

            // All good
            // Return token
            const generateToken = new GenerateToken();
            const accessToken = generateToken.accessToken({ userId: user._id });
            generateToken.refreshToken({ userId: user._id }, res);

            res.status(200).json(responseDTO.success('User logged in successfully', {
                user: { ...user._doc, password: "" },
                accessToken
            }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message))
        }
    },

    refreshToken: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const rf_token = req.cookies.v_token;
            if (!rf_token) {
                return res.status(400).json(responseDTO.badRequest("Please login!"));
            }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) {
                    return res.status(400).json(responseDTO.badRequest("Please login now!"));
                }

                const decoded = result.userId;
                const user = await userModel.findById(decoded).select("-password");
                if (!user) {
                    return res.status(400).json(responseDTO.badRequest("Please login again!"));
                }

                const generateToken = new GenerateToken();
                const accessToken = generateToken.accessToken({ userId: user._id });

                res.status(200).json(responseDTO.success("", {
                    user: { ...user._doc },
                    accessToken
                }))

            })
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },

    logout: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            res.clearCookie("v_token", { path: `${process.env.RF_TOKEN_URL}` });
            res.status(200).json(responseDTO.success("Logged out successfully"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = authController;
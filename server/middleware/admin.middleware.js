"use strict";
const userModel = require("../models/user.model");
const ResponseDTO = require("../dtos/response.dto");

const admin = async (req, res, next) => {
    const responseDTO = new ResponseDTO();
    try {
        if (!req.user)
            return res.status(401).json(responseDTO.unauthorization("Please login to continue!"));

        const user = await userModel.findById(req.user._id);

        if (user.role !== "admin")
            return res.status(400).json(responseDTO.badRequest("Admin resources access denied!"));

        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json(responseDTO.forbiden(error.message));
    }
}

module.exports = admin
"use strict";
const userModel = require("../models/user.model");
const admin = async (req, res, next)=>{
    try{
        if(!req.user) return res.status(401).json({ success: false, message: "Please login to continue!"});
        const user = await userModel.findById(user._id);

        if(user.role !== "admin") return res.status(400).json({ success: false, message: "Admin resources access denied!"});

        next();
    }catch(error){
        console.log(error)
		return res.status(403).json({ success: false, message: error.message})
    }    
}

module.exports = admin
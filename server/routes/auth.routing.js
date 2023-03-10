const express = require('express');
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");

/**  
 * @route POST api/auth/register
 * @desc Register user
 * @access Public
*/
router.post('/register',authCtrl.register)

/**
 * @route POST api/auth/login
 * @desc Login user
 * @access Public
*/
router.post('/login',authCtrl.login );

/**
 * @route POST api/auth/refresh-token
 * @desc Refresh token
 * @access Public
*/
router.post('/refresh-token', authCtrl.refreshToken);

/**
 * @route POST api/auth/logout
 * @desc Logout user
 * @access Public
*/
router.post('/logout', authCtrl.logout);

module.exports = router

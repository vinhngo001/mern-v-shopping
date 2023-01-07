const jwt = require('jsonwebtoken');
const ResponseDTO = require('../dtos/response.dto');
const userModel = require('../models/user.model');

const verifyToken = async (req, res, next) => {
	const responseDTO = new ResponseDTO();
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return responseDTO.unauthorization('Access token not found');
	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		if (!decoded) {
			return res.status(400).json(responseDTO.badRequest('Invalid signature'));
		}

		const user = await userModel.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(400).json(responseDTO.badRequest('User not found or not authorized'))
		}

		req.user = user;
		next()
	} catch (error) {
		console.log(error)
		// return res.status(403).json({ success: false, message: error.messsage })
		return res.status(403).json(responseDTO.forbiden(error.messsage));
	}
}

module.exports = verifyToken

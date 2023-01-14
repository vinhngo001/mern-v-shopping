const userModel = require("../models/user.model")
const ResponseDTO = require("../dtos/response.dto");

const userController = {
    getUser: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const user = await userModel.findById(req.userId).select('-password');

            if (!user)
                return res.status(400).json(responseDTO.badRequest('User not found'));

            res.json(responseDTO.success("Success", { ...user }))
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
}

module.exports = userController;
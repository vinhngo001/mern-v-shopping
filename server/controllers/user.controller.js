const userModel = require("../models/user.model")

const userController = {
    getUser: async (req, res) => {
        try {
            const user = await userModel.findById(req.userId).select('-password')
            if (!user)
                return res.status(400).json({ success: false, message: 'User not found' })
            res.json({ success: true, user })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

module.exports = userController;
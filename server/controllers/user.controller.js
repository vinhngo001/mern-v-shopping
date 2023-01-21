const userModel = require("../models/user.model")
const ResponseDTO = require("../dtos/response.dto");

const userController = {
    getUser: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const user = await userModel.findById(req.user._id).select('-password');

            if (!user)
                return res.status(400).json(responseDTO.badRequest('User not found'));

            res.json(responseDTO.success("Success", { ...user }))
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    addCart: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const { cart } = req.body;
            if (!cart || cart.length === 0)
                return res.status(400).json(responseDTO.badRequest('Please add new product to cart'));

            const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, {
                cart: cart
            }, { new: true, runValidators: true }).select("-password");
            
            if (!updatedUser)
                return res.status(400).json(responseDTO.badRequest('User not found or not authorized'));

            res.status(200).json(responseDTO.success("Added to cart successfully", updatedUser));
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

module.exports = userController;
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
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    addCart: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const { cart } = req.body;
            if (!cart || cart.length === 0)
                return res.status(400).json(responseDTO.badRequest('Please add new product to cart'));

            const currentUser = await userModel.findById(req.user.id).select("-password");
            if (!currentUser)
                return res.status(400).json(responseDTO.badRequest('Please login to continue shopping'));

            const updatedUser = await userModel.findOneAndUpdate({ _id: currentUser._id }, {
                cart: cart
            }, { new: true, runValidators: true }).select("-password");

            if (!updatedUser)
                return res.status(400).json(responseDTO.badRequest('User not found or not authorized'));

            res.status(200).json(responseDTO.success("Added to cart successfully", updatedUser));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
}

module.exports = userController;
const paymentModel = require("../models/payment.model");
const productModel = require("../models/product.model");
const ResponseDTO = require("../dtos/response.dto");

const paymentController = {
    getPayments: async () => {
        const responseDTO = new ResponseDTO();
        try {
            const payments = await paymentModel.find();
            res.json(payments);
        } catch (error) {
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    createPayment: async () => {
        const responseDTO = new ResponseDTO();
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    history: async () => {
        const responseDTO = new ResponseDTO();
        try {
            const histories = await paymentModel.find({ user_id: req.user._id });
            return res.status(200).json({ msg: "Get history successfully", histories })
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

const sold = async (id, quantity, oldSold) => {
    try {
        return await productModel.findOneAndUpdare({ _id: id }, {
            sold: quantity + oldSold
        })
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = paymentController;
const paymentModel = require("../models/payment.model");
const productModel = require("../models/product.model");
const ResponseDTO = require("../dtos/response.dto");
const userModel = require("../models/user.model");

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
            const user = await userModel.findById(req.user._id).select("name email");
            if (!user) {
                return res.status(400).json(responseDTO.badRequest("User does not exist."))
            }

            const { cart, paymentID, address } = req.body;

            const { _id, name, email } = user;

            const newPayment = await new paymentModel({
                user_id: _id, name, email, cart, payment_id: paymentID, address
            });

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold);
            });

            await newPayment.save();

            res.status(200).json(responseDTO.success("Payment successfully!"));
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
const productModel = require("../models/product.model");
const ResponseDTO = require("../dtos/response.dto");
const { v4: uuidv4 } = require('uuid');

const productController = {
    getAll: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const products = await productModel.find({});
            res.status(200).json(responseDTO.success("Success", products));
        } catch (error) {
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    create: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            // let schema = await productModel.schema;
            // const objectSchema = Object.keys(schema.obj);
            // const objectData = req.body;
            // const ArrData = Object.keys(objectData)
            // let err = "";
            // objectSchema.forEach(el => {
            //     if (!ArrData.includes(el)) {
            //         return err = `Field ${el} is required`
            //     }
            // });
            // if (err) {
            //     return res.status(400).json(responseDTO.badRequest(err));
            // }
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) {
                return res.status(400).json(responseDTO.badRequest("Pleas upload image for product."));
            }

            const product = await productModel.findOne({ product_id })
            if (product)
                return res.status(400).json(responseDTO.badRequest("This product already exists."));

            const newProduct = await new productModel({ product_id, title, price, description, content, images, category });
            await newProduct.save();

            res.status(200).json(responseDTO.success("Created new product successfully"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    update: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const updatedProduct = await productModel.findOneAndUpdate({ _id: req.body._id }, {
                ...req.body
            }, { new: true, runValidators: true });
            if (!updatedProduct)
                return res.status(400).json(responseDTO.badRequest("This product does not exists."));

            res.status(200).json(responseDTO.success("Updated product successfully", { product: updatedProduct }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    delete: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const deletedProduct = await productModel.findOneAndDelete({ _id: req.params.id });
            if (!deletedProduct) return res.status(400).json(responseDTO.badRequest("This product does not exist!"));

            res.staus(200).json(responseDTO.success("Deleted this product successfully!"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = productController;
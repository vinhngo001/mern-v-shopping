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
            const newProduct = await new productModel({ ...req.body });
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

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    delete: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = productController;
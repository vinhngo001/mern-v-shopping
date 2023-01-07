const productModel = require("../models/product.model");
const responseDTO = require("../dtos/response.dto");

const productController = {
    getAll: async (req, res) => {
        try{
            
        }catch(error){
            return responseDTO.serverError(error.message);
        }
    },
    create: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return responseDTO.serverError(error.message);
        }
    },
    update: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return responseDTO.serverError(error.message);
        }
    },
    delete: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return responseDTO.serverError(error.message);
        }
    }
}

module.exports = productController;
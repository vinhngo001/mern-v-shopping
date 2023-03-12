const categoryModel = require("../models/category.model");
const ResponseDTO = require("../dtos/response.dto");

const categoryController = {
    getAll: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const categories = await categoryModel.find({});
            res.status(200).json(responseDTO.success("Get categories successfully", categories));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    create: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const newCategory = await categoryModel({
                ...req.body
            });
            await newCategory.save();

            res.status(200).json(responseDTO.success("Create category success", newCategory));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },

    update: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const updatedCategory = await categoryModel.findOneAndUpdate({ _id: req.params.id }, {
                ...req.body
            }, {
                new: true,
                runValidators: true
            });

            if (!updatedCategory)
                return res.status(400).json(responseDTO.badRequest("Category not found or user not authorized"));

            res.json({ message: "Updated category success", category: updatedCategory })
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },

    delete: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const deletedCategory = await categoryModel.findOneAndDelete({ _id: req.params.id });
            if (!deletedCategory)
                return res.status(400).json(responseDTO.badRequest("Category not found or user not authorized"));

            res.status(200).json({ message: "Deleted category success", category: deletedCategory })
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = categoryController
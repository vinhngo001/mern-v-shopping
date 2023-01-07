const categoryModel = require("../models/category.model");

const categoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await categoryModel.find({});
            res.json({ categories });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const newCategory = await categoryModel({
                ...req.body
            });
            await newCategory.save();

            res.json({ message: "Create category success", category: newCategory });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updatedCategory = await categoryModel.findOneAndUpdate({ _id: req.params.id }, {
                ...req.body
            }, {
                new: true,
                runValidators: true
            });

            if (!updatedCategory) return res.status(400).json({ message: "Category not found or user not authorized" });

            res.json({ message: "Updated category success", category: updatedCategory })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deletedCategory = await categoryModel.findOneAndDelete({ _id: req.params.id });
            if (!deletedCategory) return res.status(400).json({ message: "Category not found or user not authorized" });

            res.json({ message: "Deleted category success", category: deletedCategory })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = categoryController
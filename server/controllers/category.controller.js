const categoryModel = require("../models/category.model");

const categoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await categoryModel.find({});
            res.json({categories});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = categoryController
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trime: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Categories', CategorySchema)

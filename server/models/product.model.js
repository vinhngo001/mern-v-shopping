const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Productchema = new Schema({
	product_id: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	category: {
		type: String,
		required: true
	},
	title: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	images: {
		type: Object,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	sold: {
		type: Number,
		default: 0
	},
	checked: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Products', Productchema)

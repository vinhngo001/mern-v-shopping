const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	cart: {
		type: Array,
		default: []
	},
	role:{
		type: String,
		default: "member"
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Users', UserSchema)

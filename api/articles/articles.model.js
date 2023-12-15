const { Schema, model } = require("mongoose");

const articleSchema = Schema({
	title: String,
	content: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = model("Article", articleSchema);
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema  = new Schema ({
    dateOfCreation: Date,
    username: {type: String, required: true},
    paintings: [{type: mongoose.Types.ObjectId, ref: "Painting"}],
    delivers: Boolean,
    profilePic: String,
    techniques: [String]
})

const User = mongoose.model("User", userSchema)

module.exports = User
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema  = new Schema ({
    dateOfCreation: Date,
    username: {type: String, required: true},
    paintings: [{type: mongoose.Types.ObjectId, ref: "Painting"}],
    delivers: Boolean,
    mounts: Boolean,
    profilePic: String,
    techniques: [String]
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  })

const User = mongoose.model("User", userSchema)

module.exports = User
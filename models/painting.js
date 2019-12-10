const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const PaintingSchema  = new Schema ({
    date: Date,
    title: {type: String, required: true},
    creator: mongoose.Types.ObjectId,
    creatorUsername: String,
    description: String,
    tags: [String],
    image: String,
})

const Painting = mongoose.model("Painting", PaintingSchema)

module.exports = Painting
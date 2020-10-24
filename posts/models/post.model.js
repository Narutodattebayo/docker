const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.String },
    image: { type: mongoose.Schema.Types.String, },
    userName: { type: mongoose.Schema.Types.String },
    userId: { type: mongoose.Schema.Types.ObjectId },
    userEmail: { type: mongoose.Schema.Types.String },
    isDelete: { type: mongoose.Schema.Types.Boolean, default: false }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Posts', postSchema)


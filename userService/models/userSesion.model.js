const mongoose = require("mongoose")

const userSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: mongoose.Schema.Types.String },
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('UserSession', userSessionSchema)


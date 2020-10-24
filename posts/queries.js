const mongoose = require("mongoose")
let queries = {
    allPosts: (userId) => {
        let pipeline = []
        pipeline.push({ $match: { isDelete: false } })
        pipeline.push({
            $addFields: {isCreator:{ $cond: { if: { $eq: ['$userId', mongoose.Types.ObjectId(userId)] }, then: true, else: false } }}
        })
        return pipeline;
    }
}
module.exports = { queries }
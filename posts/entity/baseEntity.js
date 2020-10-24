const mongoose = require("mongoose")


let databaseService = {

    connect: async () => {
        await mongoose.connect("mongodb://mongo1:27017/postdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        mongoose.set("debug", true)
    },
    insert: async (model, data) => {
        try {
            let response = await new model(data).save()
            return response
        }
        catch (err) {
            console.log(err)
        }

    },
    findOne: async (model, conditions) => {
        console.log(">>>>>>>>>>>>")
        let response = await model.findOne(conditions)
        console.log(response)
        return response
    },
    edit: async (model, query, update) => {
        await model.updateOne(query, update)
    },
    updateMany: async (model, query, update) => {
        await model.updateMany(query, update)
    },
    basicAggregation: async (model, pipeline) => {
        console.log(">>>>>>>>>>>>")
        let response = await model.aggregate(pipeline)
        console.log(response)
        return response
    },

}




module.exports = { databaseService }
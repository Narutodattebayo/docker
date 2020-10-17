const mongoose = require("mongoose")
const keys = require('../keys')


let databaseService = {

    connect: async () => {
        await mongoose.connect("mongodb://mongo:27017/mydb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        mongoose.set("debug", true)
    },
    insert: async (model, data) => {

        let response = await new model(data).save()
        return response
    },
    findOne: async (model, conditions) => {
        console.log(">>>>>>>>>>>>")
        let response = await model.findOne(conditions)
        console.log(response)
        return response
    },
    edit: async (model, query,update) => {
        await model.updateOne(query,update)
    }

}




module.exports = { databaseService }
const { Kafka } = require('kafkajs')
const  databaseService  = require('../entity/baseEntity').databaseService
const  postsModel  = require('../models/post.model')
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ["kafka:9092"]
})
const consumer = kafka.consumer({ groupId: 'user-group' })
const admin = kafka.admin()
const KAFKA_CONFIGURE = {
    connect: async () => {
        await admin.connect()
        await admin.createTopics({
            topics: [
                {
                    topic: "User",
                    numPartitions: 1,
                    replicationFactor: 1,

                }
            ]
        })
        await consumer.connect()
        await consumer.subscribe({ topic: 'User', fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                })
                databaseService.updateMany(postsModel, { userId: message.key }, { userName: message.value })
            },
        })
    },

  


}


module.exports = { KAFKA_CONFIGURE }

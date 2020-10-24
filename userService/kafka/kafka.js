const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ["kafka:9092"]
})
const producer = kafka.producer()
const admin = kafka.admin()
const KAFKA_CONFIGURE = {
    connect: async () => {
        let ress = await admin.connect()
        let response = await admin.createTopics({
            topics: [
                {
                    topic: "User",
                    numPartitions: 1,
                    replicationFactor: 1,

                }
            ]
        })
        let pro = await producer.connect()
        // console.log("??????????????????/", pro)
        // let produced = await producer.send({
        //     topic: 'User',
        //     messages: [
        //         { key: 'key1', value: 'hello world' },
        //         { key: 'key2', value: 'hey hey!' }
        //     ],
        // })
        // console.log("....sssssss.........", produced)
    },

    sendMessage: async (topic, data) => {
        console.log(data)
        producer.send({
            topic: topic,
            messages:data
        })
    }


}


module.exports = { KAFKA_CONFIGURE }

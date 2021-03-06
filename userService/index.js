const express = require('express')
const app = express()
const routes = require('./routes/userRoutes').router
const connection = require('./entity/baseEntity').databaseService
const errorHandler = require('./errorHandler').errorHandler
const invalidRoute = require('./errorHandler').invalidRoute
const redis=require('./redis/redis').REDIS
const kafka=require('./kafka/kafka').KAFKA_CONFIGURE

app.use(express.json())
app.use('/user', routes)
app.use(errorHandler)
app.use(invalidRoute)
connection.connect()
redis.connect()
kafka.connect()

app.listen(2222, () => {
    console.log("user service started ")
})
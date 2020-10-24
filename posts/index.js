const express = require('express')
const app = express()
const routes = require('./routes/posts.routes').router
const connection = require('./entity/baseEntity').databaseService
const errorHandler = require('./errorHandler').errorHandler
const invalidRoute = require('./errorHandler').invalidRoute
const redis=require('./redis/redis').REDIS
const kafka=require('./kafka/kafka').KAFKA_CONFIGURE
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/posts', routes)
app.use(errorHandler)
app.use(invalidRoute)
connection.connect()
redis.connect()
kafka.connect()

app.listen(3333, () => {
    console.log("post service started ")
})
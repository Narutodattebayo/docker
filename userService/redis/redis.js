const redis = require('redis')
let client
const REDIS = {

    connect: () => {
        client = redis.createClient(
            {
                host: "redis",
                port: 6379
            }
        )
    },
    saveUserData: async (key, value) => {
        try {

            let response = await client.set(`user:${key}`, JSON.stringify(value))
            return response
        } catch (err) {
            console.log(err);
            Promise.reject({ http: 400, status: 400, message: "Internal Server Error" })
        }

    },
    getUserData: async (key) => {
        try {
            return new Promise((resolve, reject) => {
                client.get(`user:${key}`, (err, response) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    console.log(111111111111, response)
                    resolve(response)
                })
            })


        } catch (err) {
            console.log(err);
            Promise.reject({ http: 400, status: 400, message: "Internal Server Error" })
        }
    },

    deleteUserFromRedis: async (key) => {
        client.del(`user:${key}`)
        return;
    }
}
module.exports = { REDIS }
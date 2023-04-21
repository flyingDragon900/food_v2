const mongoose = require('mongoose')
const uri = process.env.MONGO_DB_URI

const mongoDbConnection = async () => {
    try {
        const conn = await mongoose.connect(uri)
        console.log(conn.connection.host, 'connected to db');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = mongoDbConnection


const mongoose = require('mongoose');
const connect_uri =  require("../dbconnecturi/uri");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connect_uri);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
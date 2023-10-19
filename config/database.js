const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/bibliography-tracker-app";
const connectDB = async () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        return client;
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

module.exports = connectDB;

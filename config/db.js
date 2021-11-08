const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connected to the DB...');
    } catch (err) {
        console.error(err.message);
        // implement graceful shutdown
        process.exit(1);
    }
};

module.exports = connectDB;

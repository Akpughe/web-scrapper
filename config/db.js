const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async (client) => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      //   useCreateIndex: true
    });
    console.log('MongoDB Conneted...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

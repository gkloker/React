const mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MOMGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('DB connected');
  } catch(error) {
    console.log(error);
    process.exit(1); // Stop app
  }
}

module.exports = connectDB;
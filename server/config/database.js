const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log("Database is not connected");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectDB;

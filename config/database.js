const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGOURI);
    // console.log("Database Host:", connect.connection.host);
    console.log("Database name:", connect.connection.name);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnection;

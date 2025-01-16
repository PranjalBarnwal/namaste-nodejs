const mongoose = require("mongoose");

const connectToDb = async () => {
  console.log("connecting to mongo...");
  await mongoose.connect(
    "mongodb+srv://supersecretpass:supersecretpass@namastenode.bsqkb.mongodb.net/devTinder"
  );
};

module.exports = connectToDb;

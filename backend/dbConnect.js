// getting-started.js
const mongoose = require('mongoose');


async function ConnectToMongo() {
  await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
  console.log("connecting successfully")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

ConnectToMongo().catch(err => console.log(err));
module.exports = ConnectToMongo;
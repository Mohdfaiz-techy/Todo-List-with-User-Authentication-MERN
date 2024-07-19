const express = require('express')
const app = express()
const ConnectToMongo = require("./dbConnect")
const PORT = 5000;
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
ConnectToMongo();
const user = require("./Routes/users")
app.use('/todoList',require("./Routes/todoList"))
app.use('/user',user)
// Server Listening at port 3000

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
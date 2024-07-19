const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoListSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: "String",
    // required : true
  },
  description: {
    type: "String",
    // required : true
  },
});
const TodoList = mongoose.model("todoList", TodoListSchema);
module.exports = TodoList;

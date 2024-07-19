const todoList = require("../Models/todoList");
const { validationResult } = require("express-validator");
const handleFetchTodo = async (req, res) => {
  try {
    let todo = await todoList.find({
      // finding todos by user id which is taken from jwt- token from the middleware(fetchuser)
      user: req.user.id,
    });
    res.json( todo);
    if (!todo) {
      return res.status(400).json({ success, error: "there is no todo " });
    }
  } catch {
    console.error("error");
    res.status(500).send("internal server  error occured");
  }
};
const handleCreateTodo = async (req, res) => {
  try {
    const errors = validationResult(req);

    //  check error is empty or not
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
      // return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    // we can create new user by  database query schema-name.create({}) and new schema-Name.schema({}) //here schema name is todolist but with new scheme syntax we can add data in databare by variable.save();
    let todo = new todoList({
      title: title,
      description: description,
      // adding user id with the todo which is taken from jwt-token
      user: req.user.id,
    });

    // here it is variable.save()
     todo = await todo.save();
    res.json( todo );
  } catch {
    console.error("error"); 
  }
};

const handleUpdateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    let newTodo = {};
    if (title) {
      newTodo.title = title;
    }
    if (description) {
      newTodo.description = description;
    }

    // find a todo by id
    let todo = await todoList.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ msg: "todo not found" });
    }

    // check the user is same or not by userID
    if (todo.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "user unautherized" });
    }
    // update an exitng todo by id
    todo = await todoList.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    console.error("error");
    res.status(500).send("internal server  error occured");
  }
};
const handleDeleteTodo = async (req, res) => {
  try {
    // find a todo by id
    let todo = await todoList.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ msg: "todo not found" });
    }

    // check the user is same or not by userID
    if (todo.user.toString() !== req.user.id) {
      console.log(req.user.id);
      return res.status(400).json({ msg: "user unautherized" });
    }
    // delete a todo by id
     let deletTodo = await todoList.findByIdAndDelete(req.params.id);

     console.log(deletTodo)
    const delTodo = await deletTodo;
    console.log(delTodo)
    res.json(delTodo);
  } catch (error) {
    console.error("error");
    res.status(500).send("internal server  error occured");
  }
};
module.exports = {
  handleFetchTodo,
  handleCreateTodo,
  handleUpdateTodo,
  handleDeleteTodo,
};

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchUser = require("../middleWare/fetchUser");

const {
  handleFetchTodo,
  handleCreateTodo,
  handleUpdateTodo,
  handleDeleteTodo,
} = require("../Controller/todoList");

// Route 1 // fetching all todos by the req http://localhost:3000/todoList/fetchAllTodo
router.get("/fetchAllTodo", fetchUser, handleFetchTodo);

// Route 2  // Create  todo by the reqhttp://localhost:3000/todoList/createtodo
router.post(
  "/createTodo",
  fetchUser,
  // using validation to verify valid inputs (MIDDLEWARE) by express-validator
  [[body("title").notEmpty(), body("description").isLength({ min: 5 })]],
  handleCreateTodo
);

// Route 3  // edit  todo by the req http://localhost:3000/todoList/updateTodo/:id
router.put("/updateTodo/:id", fetchUser, handleUpdateTodo);

// Route 4 // delete  todo by the req http://localhost:3000/todoList/deleteTodo/:id
router.delete("/deleteTodo/:id", fetchUser, handleDeleteTodo);

module.exports = router;

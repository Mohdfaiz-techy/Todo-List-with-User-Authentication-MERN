const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middleWare/fetchUser");
const { handleCreateUser, handleAuthenticateUser ,handleGetUser} = require("../Controller/users");

// Route 1 // create new users by the req http://localhost:3000/user/createUser
router.post(
  "/createUser",
  // using validation to verify valid inputs (MIDDLEWARE) by express-validator
  [
    [
      body("name").notEmpty(),
      body("email","enter a valid email").isEmail(),
      body("password").isLength({ min: 5 }),
    ],
  ],
  handleCreateUser
 
);

// Route 2 // Authenticate  users by the req http://localhost:3000/user/login
router.post(
  "/login",
  [
    [
      body("email", "enter a valid email").isEmail(),
      body("password", "password must be atleast 5 characters").isLength({
        min: 5,
      }),
    ],
  ],
  handleAuthenticateUser
);
// Route 3 //  get Authenticate  users by the req http://localhost:3000/user/getUser/:id
router.get("/getUser", fetchUser, handleGetUser);

module.exports = router;

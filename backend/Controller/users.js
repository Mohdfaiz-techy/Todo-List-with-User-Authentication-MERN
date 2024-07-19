
const {  validationResult } = require("express-validator");
const User = require("../Models/users");
const jwt = require("jsonwebtoken");
const jwt_secret = "this string is secret";

const handleCreateUser =  async (req, res) => {
    try {
      let success = false;
      const errors = validationResult(req);
      //  check error is empty or not
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success,
          error: "the user with this email is alreary exists",
        });
      }
      // we can create new user by  database query schema-name.create({}) and new schema-Name.schema({}) //here schema name is user but with new scheme syntax we can add data in databare by variable.save();
      user = await User.create({
        name: name,
        email: email,
        password: password,
      });

      const userData = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(userData, jwt_secret);
      // here it is variable.save()
      // const savedUser = await user.save();
      // res.json(savedUser);
      res.status(200).json({ success: "Successful Sign Up!", token });
    } catch {
      console.error("error");
      res.status(500).send("internal server  error occured");
    }
  }

  const handleAuthenticateUser =  async (req, res) => {
    try {
      let success = false;
      const errors = validationResult(req);
      //  check error is empty or not
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        console.log("hello world");
        return res.status(400).json({
          success,
          error: "enter right credentials",
        });
      }
      console.log(user);

      if (password === user.password) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        const token = jwt.sign(payload, jwt_secret);

        return res
          .status(200)
          .json({ success: "Successful Login!", token: token });
      }
      res.status(400).json({
        success,
        error: "enter right credential",
      });
    } catch {
      console.error("error");
      res.status(500).send("internal server  error occured");
    }
  }
  const handleGetUser =async (req, res) => {
    try {
      let user = req.user.id;
      let getUser = await User.findById(user).select("-password");
      if (!getUser) {
        return res.status(400).json({
          success,
          error: "enter right credentials",
        });
      }
      res.status(200).json({ getUser });
    } catch {
      console.error("error");
      res.status(500).send("internal server  error occured");
    }
  }
  module.exports = {
    handleCreateUser,handleAuthenticateUser,handleGetUser
  }
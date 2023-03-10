const User= require('../models/users.js');
const bcrypt= require("bcryptjs");

const auth = require("../../middleware/auth.js");
const { JsonWebTokenError } = require('jsonwebtoken');
async function login({ username, password }, callback) {
    const user = await User.findOne({ username });
  
    if (user != null) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = auth.generateAccessToken(username);
        // call toJSON method applied during model instantiation
        return callback(null, { ...user.toJSON(), token });
      } else {
        return callback({
          message: "Invalid Username/Password!",
        });
      }
    } else {
      return callback({
        message: "Invalid Username/Password!",
      });
    }
  }
  
  async function register(params, callback) {
    if (params.username === undefined) {
      console.log(params.username);
      return callback(
        {
          message: "Username Required",
        },
        ""
      );
    }
  
    const user = new User(params);
    user
      .save()
      .then((response) => {
        return callback(null, response);
      })
      .catch((error) => {
        return callback(error);
      });
  }
  
    module.exports={
        login,
        register
    };
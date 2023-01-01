const bcrypt = require("bcryptjs");
// const { user } = require("../../routes/routes");
const userServices = require("../services/users.services");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const auth= require("../../middleware/auth");



exports.register = (req, res, next) => {
  const { password } = req.body;

  const salt = bcrypt.genSaltSync(10);

  req.body.password = bcrypt.hashSync(password, salt);

  userServices.register(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  userServices.login({ username, password }, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

exports.getAllUsers=(req,res,next)=>{
let token=req.headers.token;
jwt.verify(token,'Snippet_SecretKEY',(err,decoded)=>{
  if(err) return next(err);
  console.log(decoded);
  // token is valid
})
  User.findOne({username: decoded.username},(err, user)=>{
    if(err) return console.log(err)
    return res.status(200).json({
      title:'user grabbed',
      user:{
        email:User.email,
        username:User.username
      }
    })
  })
}

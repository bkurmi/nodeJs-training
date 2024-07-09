const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signUp = (req, res, next) => {
  //handle errors coming during request validation in router definition.
  const error = validationResult(req);
  if (!error.isEmpty()) {
    error.statusCode = 422;
    error.data = errors.array(); //this is how we get error by default errors.array()
    throw error;
  }

  //Accepting request details
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 12; // The higher the salt rounds, the more secure the hash, but it will take longer to compute.

  //bcrypt use for Hashing and Verifying a Password. Here we are hasing the password before saving in DB
  bcrypt
    .hash(password, saltRounds)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User created!",
        userId: result._id
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

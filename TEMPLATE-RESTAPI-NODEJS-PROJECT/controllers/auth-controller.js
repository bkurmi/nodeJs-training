const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signUp = (req, res, next) => {
  //handle errors coming during request validation in router definition.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 400;
    error.title = "VALIDATION_FAILED";
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
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        error.title = "USER_NOT_FOUND";
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        error.title = "AUTHENTICATION_FAILED_PASSWORD_NOT_MATCHED";
        throw error;
      }
      //If user matches than generate the token which will than need to be passed in all subsequent API calls
      //'somesupersecretsecret' is String which is known only application owners, which is use to generate JWT token
      //later same somesupersecretsecret will be used to validate JWT token during Auth token validation.
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "somesupersecretsecret",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

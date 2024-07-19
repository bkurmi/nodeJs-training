const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    error.title = "AUTH_HEADER_MISSING";
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;

  //This is one way of handling excpetion using try catch
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    err.statusCode = 500;
    err.title = "INVALID_TOKEN";
    throw err;
  }
  console.log("-------decodedToken-----------")
  console.log(decodedToken)
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    error.title = "INVALID_TOKEN";
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};

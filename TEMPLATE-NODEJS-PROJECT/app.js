const express = require("express");
const productRoutes = require("./routes/product-routes");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");

const app = express();
const port = 8082;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log the complete request -NOT WORKING
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  console.log("Params:", req.params);
  next();
});

//associate all the routes in application like this
app.use(productRoutes);
app.use(authRoutes);

//registering the middleware for error/exception handler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const detail = error.message;
  const data = error.data;
  const title = error.title || 'INTERNAL_SERVER_ERROR';
  res.status(status).json({
    code: status,
    title: title,
    detail: detail,
    data: data
  });
});

mongoose
  .connect(
    "mongodb+srv://drl-amp:humza123@amp-cluster.r0obtny.mongodb.net/nodejs-training?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("DB Connection established, starting server ....");
    app.listen(port, () => {
      console.log("Application server started ... on port ", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

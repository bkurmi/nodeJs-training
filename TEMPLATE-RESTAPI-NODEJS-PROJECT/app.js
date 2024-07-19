const express = require("express");
const productRoutes = require("./routes/product-routes");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");
const { loggerMiddleware } = require("./middleware/loger-middleware");
const { errorMiddleware } = require("./middleware/error-middleware");

const app = express();
const port = 8082;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log the complete request -NOT WORKING
app.use(loggerMiddleware);

//associate all the routes in application like this
app.use(productRoutes);
app.use(authRoutes);

//registering the middleware for error/exception handler
app.use(errorMiddleware);

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

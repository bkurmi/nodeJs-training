const express = require('express')
const routes = require('./routes/routes')
const mongoose = require('mongoose');

const app = express()
const port = 3000

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log the complete request -NOT WORKING
app.use((req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('Params:', req.params);
  next();
});

//associate all the routes in application like this
app.use(routes)


mongoose
  .connect(
    "mongodb+srv://drl-amp:humza123@amp-cluster.r0obtny.mongodb.net/nodejs-training?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("DB Connection established, starting server ....");
    app.listen(port, () => {
      console.log("Application server started ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

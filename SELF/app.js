const express = require('express')
const routes = require('./routes/routes')
const { connectToDB } = require('./util/database')
const app = express()
const port = 3000

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log the complete request -NOT WORKING
app.use((req, res, next) => {
  console.log(req)
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('Params:', req.params);
  next();
});

//associate all the routes in application like this
app.use(routes)

// Function to start the server
async function startServer() {
    try {
      // Ensure the database connection is established
      await connectToDB();
      console.log('Database connected, starting server...');
      
      // Start the server
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (err) {
      console.error('Failed to start server:', err);
    }
  }

// Start the server
startServer();
const express = require('express');
const routes = require('./routes/routes');
const path = require('path');

const app = express()

//Exposing public folder to be accessible from anywhere inide the application (like from HTML)
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(3000);
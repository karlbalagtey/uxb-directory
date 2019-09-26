const http = require('http');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const userRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));

app.use(userRoutes);
app.use('/', (req, res, next) => {
    res.send("<h1>Hello from UXB London.</h1>");
});

const server = http.createServer(app);

server.listen(3000);
const http = require('http');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const userRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));

app.use(userRoutes);

/**
 * Unspecifed request
 */
app.use((req, res, next) => {
    res.status(404).send({
        'err' : 'Unspecified request'
    });
});

const server = http.createServer(app);

server.listen(3000);
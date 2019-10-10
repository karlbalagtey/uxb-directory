const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const clientRoutes = require('./routes/clientRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// Routes
app.use(clientRoutes);
app.use(roleRoutes);
app.use(userRoutes);

// Error handling 
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect('mongodb+srv://hmtareque:hasan076@cluster0-mhyrp.mongodb.net/uxb_directory?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(result => {
   // console.log('server running ...');
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
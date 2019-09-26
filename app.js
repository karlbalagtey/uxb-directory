const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const userRoutes = require('./routes/users');

app.use(bodyParser.json());

app.use(userRoutes);

/**
 * Unspecifed request
 */
app.use((req, res, next) => {
    res.status(404).send({
        'err' : 'Unspecified request'
    });
});

mongoose.connect('mongodb+srv://hmtareque:hasan076@cluster0-mhyrp.mongodb.net/uxb_directory?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});




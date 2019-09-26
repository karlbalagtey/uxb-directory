// User model
const User = require('../models/user');

exports.getUser = (req, res, next) => {

    res.send('specified user');

}

exports.getUsers = (req, res, next) => {

    res.send('all users');

}


exports.storeUser = (req, res, next) => {

    // create a user in database 
    const title = req.body.title;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;

    const user = new User({
        client_id: 1,
        role_id: 2,
        title: title,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: 'test',
    });

    user.save();

    res.status(201).json({
        message: 'User created successfully.'
    });
}

exports.updateUser = (req, res, next) => {

    res.send('update specified user');

}


exports.deleteUser = (req, res, next) => {

    res.send('delete specified user');

}


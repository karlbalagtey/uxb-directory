// User model
const User = require('../models/userModel');

exports.getUser = (req, res, next) => {

    const userId = req.params.userId;

    User.findById(userId)
    .then(user => {
        return res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.getUsers = (req, res, next) => {

    User.find()
    .then(users => {
        return res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}


exports.storeUser = (req, res, next) => {

    // create a user in database 
    const client = 1;
    const role = 2;
    const title = req.body.title;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        client_id: client,
        role_id: role,
        title: title,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
    });

    user.save();

    res.status(201).json({
        message: 'User created successfully.'
    });
}


exports.updateUser = (req, res, next) => {

    const updated_client = 1;
    const updated_role = 2;
    const updated_title = req.body.title;
    const updated_first_name = req.body.first_name;
    const updated_last_name = req.body.last_name;
    const updated_email = req.body.email;
    const updated_password = req.body.password;

    const userId = req.params.userId;

    User.findById(userId)
    .then(user => {

        user.client_id = updated_client;
        user.role_id = updated_role;
        user.title = updated_title;
        user.first_name = updated_first_name;
        user.last_name = updated_last_name;
        user.email = updated_email;
        user.password = updated_password;

        user.save();
        
        res.status(200).json({
            message: 'User updated successfully.',
            user: user
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.deleteUser = (req, res, next) => {

    const userId = req.params.userId;

    User.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).json({
            message: 'User deleted successfully.',
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

}


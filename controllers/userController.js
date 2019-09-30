const { validationResult } = require('express-validator');

const storeUserRequest = require('../requests/storeUserRequest');

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

    const errors = validationResult(req);
    
    if(errors.isEmpty()) {
        const newUser = storeUserRequest.data(req);
        const user = new User(newUser);
        user.save();

        res.status(201).json({
            message: 'User created successfully.'
        });
    } else {
        res.status(422).json(errors);
    }
}


exports.updateUser = (req, res, next) => {

    const errors = validationResult(req);

    if(errors.isEmpty()) {
        res.status(200).json({
            message: 'test'
        });
    }

    res.status(200).json({
        message: errors
    });
    

    // res.status(200).json({
    //     message: 'User updated successfully.'
    // });


    // const errors = validationResult(req);
    
    // if(errors.isEmpty()) {
    //     // const newUser = storeUserRequest.data(req);
    //     // const user = new User(newUser);
    //     // user.save();

    //     // res.status(201).json({
    //     //     message: 'User created successfully.'
    //     // });

    //     res.status(200).json();
    // } else {
    //     res.status(422).json(errors);
    // }




    // const updated_client = 1;
    // const updated_role = 2;
    // const updated_title = req.body.title;
    // const updated_first_name = req.body.first_name;
    // const updated_last_name = req.body.last_name;
    // const updated_email = req.body.email;
    // const updated_password = req.body.password;

    // const userId = req.params.userId;

    // User.findById(userId)
    // .then(user => {

    //     user.client_id = updated_client;
    //     user.role_id = updated_role;
    //     user.title = updated_title;
    //     user.first_name = updated_first_name;
    //     user.last_name = updated_last_name;
    //     user.email = updated_email;
    //     user.password = updated_password;

    //     user.save();
        
    //     res.status(200).json({
    //         message: 'User updated successfully.',
    //         user: user
    //     });
    // })
    // .catch(err => {
    //     res.status(500).json({
    //         error: err
    //     });
    // });
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


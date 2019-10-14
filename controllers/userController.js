const { validationResult } = require('express-validator');

// Requests
const storeUserRequest = require('../requests/storeUserRequest');
const updateUserRequest = require('../requests/updateUserRequest');

// Models
const User = require('../models/userModel');
const Client = require('../models/clientModel');
const Role = require('../models/roleModel');

/**
 * Returns specified user
 */
exports.getUser = (req, res, next) => {

    const userId = req.params.userId;

    User.findOne({ "_id": userId, deleted_at: null })
        .populate('role')
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Returns list of all user
 */
exports.getUsers = (req, res, next) => {

    User.find({ deleted_at: null })
        .then(users => {
            return res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Store new user in the storage 
 */
exports.storeUser = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {

        try {
            const newUser = storeUserRequest.data(req);
            const user = new User(newUser);

            Client.findById(user.client)
            .then(client => {

                client.users.push(user.id);
                client.save();
                user.save();

                res.status(201).json({
                    message: 'User created successfully.',
                    user: user
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: 'failed'
                });
            })

        } catch (err) {
            res.status(500).json({
                error: 'failed 3'
            });
        }

    } else {
        res.status(422).json(errors);
    }
}


/**
 * Update specified user details 
 */
exports.updateUser = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {

        const userId = req.params.userId;
        const email = req.body.email;

        User.findById(userId)
            .then(user => {

                User.findOne({ "_id": { $ne: userId }, email: email, deleted_at: null })
                    .then(result => {
                        return result;
                    })
                    .then(result => {
                        if (result) {
                            res.status(422).json({
                                errors: {
                                    msg: "Email already in use",
                                    param: "email",
                                    location: "body"
                                }
                            });
                        } else {
                            try {
                                const updatedUser = updateUserRequest.data(user, req);


                                // update client if required 
                                Client.
                                findById(updatedUser.client_id).
                                exec(function(err, client){
                                    test;
                                    if(err) return handleError(err);

                                });
                                



                                updatedUser.save();
                                res.status(200).json({
                                    message: 'User details updated successfully.',
                                    user: updatedUser
                                });

                            } catch (err) {
                                res.status(500).json({
                                    errors: err
                                });
                            }

                            
                        }

                    })
                    .catch(err => {
                        res.status(500).json({
                            errors: err
                        });
                    });
            })
            .catch(err => {
                res.status(500).json({
                    errors: err
                });
            });

    } else {
        res.status(422)
            .json(errors);
    }
}

/**
 * Delete specified user in the storage 
 */
exports.deleteUser = (req, res, next) => {

    const userId = req.params.userId;

    User.findOne({ "_id": userId, deleted_at: null })
        .then(user => {

            try {
                user.deleted_at = Date.now();
                user.deleted_by = 1;
                user.save();
            } catch (err) {
                res.status(404).json({
                    error: err
                });
            }

            res.status(200).json({
                message: 'User deleted successfully.'
            });
        })
        .catch(err => {
            res.status(404).json({
                error: 'User not found'
            });
        });
}


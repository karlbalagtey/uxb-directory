const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/userModel');
const Client = require('../models/clientModel');

/**
 * Validate request
 */
exports.validate = () => {

    return [
        body('client_id').exists().isMongoId().custom(clientId => Client.isValid(clientId)),
        body('role_id').exists(),
        body('title').optional(),
        body('first_name').exists(),
        body('last_name').exists(),
        check('email').exists().isEmail().custom(email => User.isEmailAlreadyExist(email)),
        body('password').exists().isLength({ min: 6 })
    ];
}

/**
 * New user data 
 */
exports.data = (req) => {

    const client = req.body.client_id;
    const role = 2;
    const title = req.body.title;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    var hash = bcrypt.hashSync(password, 8);

    const user = {
        client_id: client,
        role_id: role,
        title: title,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hash,
        created_by: 1
    };

    return user;
}
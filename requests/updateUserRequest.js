const { body, check} = require('express-validator');

// User model
const User = require('../models/userModel');

/**
 * Validate request 
 */
exports.validate = () => {

    return [ 
        check('userId').exists().isMongoId().custom(userId => User.isValid(userId)),
        body('client').exists().isMongoId().custom(clientId => Client.isValid(clientId)),
        body('role').exists().isMongoId().custom(roleId => Role.isValid(roleId)),
        body('title').optional(),
        body('first_name').exists(),
        body('last_name').exists(),
        check('email').isEmail(),
       ]; 
}

/**
 * Existing user's updated data
 */
exports.data = (user, req) => {

    const updated_client = req.body.client;
    const updated_role = req.body.role;
    const updated_title = req.body.title;
    const updated_first_name = req.body.first_name;
    const updated_last_name = req.body.last_name;
    const updated_email = req.body.email;

    user.client_id = updated_client;
    user.role_id = updated_role;
    user.title = updated_title;
    user.first_name = updated_first_name;
    user.last_name = updated_last_name;
    user.email = updated_email;
    user.updated_at = Date.now();
    user.updated_by = 1;

    return user;
}
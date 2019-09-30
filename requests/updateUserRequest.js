const { body, check} = require('express-validator');

// User model
const User = require('../models/userModel');

exports.validate = () => {

    return [ 
        check('userId').exists().isMongoId().custom(val => User.isValid(val)),
        body('client_id').exists(),
        body('role_id').exists(),
        body('title').optional(),
        body('first_name').exists(),
        body('last_name').exists(),
        check('email').isEmail(),
        body('password').exists()
       ]; 
}


exports.data = (req) => {

    // create a user in database 
    const client = 1;
    const role = 2;
    const title = req.body.title;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    const user = {
        client_id: client,
        role_id: role,
        title: title,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
    };

    return user;

}
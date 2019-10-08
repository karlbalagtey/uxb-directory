const { body } = require('express-validator');

// User model
const Client = require('../models/clientModel');

/**
 * Validate request
 */
exports.validate = () => {

    return [
        body('name').exists().custom(name => Client.isNameAlreadyExist(name)),
    ];
}

/**
 * New client data 
 */
exports.data = (req) => {

    const name = req.body.name;

    const client = {
        name: name,
        created_by: 1
    };

    return client;
}
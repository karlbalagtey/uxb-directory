const { body, check} = require('express-validator');

// Client model
const Client = require('../models/clientModel');

/**
 * Validate request 
 */
exports.validate = () => {

    return [ 
        check('clientId').exists().isMongoId().custom(clientId => Client.isValid(clientId)),
        body('name').exists(),
       ]; 
}

/**
 * Existing client's updated data
 */
exports.data = (client, req) => {

    const updated_name = req.body.name;

    client.name = updated_name;
    client.updated_at = Date.now();
    client.updated_by = 1;

    return client;
}
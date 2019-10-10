const { body, check} = require('express-validator');

// Client model
const Client = require('../models/clientModel');

/**
 * Validate request 
 */
exports.validate = () => {

    return [ 
        // check('clientId').exists().isMongoId().custom(clientId => Client.isValid(clientId)),
        // body('name').exists(),
        // check('status').isIn(['active', 'inactive']),
       ]; 
}

/**
 * Existing client's updated data
 */
exports.data = (client, req) => {

    const updated_name = req.body.name;
    const updated_status = req.body.status;

    client.name = updated_name;
    client.status = updated_status;
    client.updated_at = Date.now();
    client.updated_by = 1;

    return client;
}
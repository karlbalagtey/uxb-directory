const { body, check} = require('express-validator');

// Client model
const Client = require('../models/clientModel');

/**
 * Validate request 
 */
exports.validate = () => {

    return [ 
        check('client_id').exists().isMongoId().custom(clientId => Client.isValid(clientId)),
        body('name').exists(),
        check('status').isIn(['active', 'inactive']),
       ]; 
}

/**
 * Existing role's updated data
 */
exports.data = (role, req) => {

    const updated_name = req.body.name;
    const updated_permissions = req.body.permissions;
    const updated_status = req.body.status;

    role.name = updated_name;
    role.permissions = updated_permissions;
    role.status = updated_status;
    role.updated_at = Date.now();
    role.updated_by = 1;

    return role;
}
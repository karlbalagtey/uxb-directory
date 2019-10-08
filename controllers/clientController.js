const { validationResult } = require('express-validator');

// Requests
const storeClientRequest = require('../requests/storeClientRequest');
const updateClientRequest = require('../requests/updateClientRequest');

// Models
const Client = require('../models/clientModel');

/**
 * Returns specified client
 */
exports.getClient = (req, res, next) => {

    const clientId = req.params.clientId;

    Client.findOne({ "_id": clientId, deleted_at: null })
        .populate('users')
        .then(client => {
            return res.status(200).json(client);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Returns list of all client
 */
exports.getClients = (req, res, next) => {

    Client.find({ deleted_at: null })
        .then(clients => {
            return res.status(200).json(clients);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Store new client in the storage 
 */
exports.storeClient = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {

        const newClient = storeClientRequest.data(req);
        const client = new Client(newClient);

        try {
            client.save();
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }

        res.status(201).json({
            message: 'Client created successfully.',
            client: client
        });

    } else {
        res.status(422).json(errors);
    }
}


/**
 * Update specified client details 
 */
exports.updateClient = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) { 

        const clientId = req.params.clientId;
        const name = req.body.name;

        Client.findById(clientId)
            .then(client => {

                Client.findOne({ "_id": { $ne: clientId }, name: name, deleted_at: null })
                    .then(result => {
                        return result;
                    })
                    .then(result => {
                        if (result) {
                            res.status(422).json({
                                errors: {
                                    msg: "Name already in use",
                                    param: "name",
                                    location: "body"
                                }
                            });
                        } else {
                            try {
                                const updatedClient = updateClientRequest.data(client, req);
                                updatedClient.save();

                                res.status(200).json({
                                    message: 'Client details updated successfully.',
                                    client: updatedClient
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
 * Delete specified client in the storage 
 */
exports.deleteClient = (req, res, next) => {

    const clientId = req.params.clientId;

    Client.findOne({ "_id": clientId, deleted_at: null })
        .then(client => {

            try {
                client.deleted_at = Date.now();
                client.deleted_by = 1;
                client.save();
            } catch (err) {
                res.status(404).json({
                    error: err
                });
            }

            res.status(200).json({
                message: 'Client deleted successfully.'
            });
        })
        .catch(err => {
            res.status(404).json({
                error: 'Client not found'
            });
        });
}


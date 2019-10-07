const express = require('express');

const router = express.Router();
const clientController = require('../controllers/clientController');

//Request 
const storeClientRequest = require('../requests/storeClientRequest');
const updateClientRequest = require('../requests/updateClientRequest');

/**
 * Supply a specified client
 */
router.get('/clients/:clientId', clientController.getClient);

/**
 * Supply the list of all clients
 */
router.get('/clients', clientController.getClients);

/**
 * Store newly created client
 */ 
router.post('/clients', storeClientRequest.validate(), clientController.storeClient);


/**
 * Update a specified client
 */
router.put('/clients/:clientId', updateClientRequest.validate(), clientController.updateClient);


/**
 * Delete a specifed client
 */
router.use('/clients/:clientId', clientController.deleteClient);

module.exports = router;
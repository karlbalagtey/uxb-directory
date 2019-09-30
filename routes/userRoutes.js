const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

//Request 
const storeUserRequest = require('../requests/storeUserRequest');
const updateUserRequest = require('../requests/updateUserRequest');

/**
 * Supply a specified user
 */
router.get('/users/:userId', userController.getUser);

/**
 * Supply the list of all users
 */
router.get('/users', userController.getUsers);

/**
 * Store newly created user  
 */ 
router.post('/users', storeUserRequest.validate(), userController.storeUser);


/**
 * Update a specified user 
 */
router.put('/users/:userId', updateUserRequest.validate(), userController.updateUser);


/**
 * Delete a specifed user
 */
router.use('/users/:userId', userController.deleteUser);

module.exports = router;
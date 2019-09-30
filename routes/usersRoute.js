const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController');

/**
 * Supply a specified user
 */
router.get('/users/:userId', usersController.getUser);

/**
 * Supply the list of all users
 */
router.get('/users', usersController.getUsers);

/**
 * Store newly created user  
 */ 
router.post('/users', usersController.storeUser);


/**
 * Update a specified user 
 */
router.put('/users/:userId', usersController.updateUser);


/**
 * Delete a specifed user
 */
router.use('/users/:userId', usersController.deleteUser);

module.exports = router;
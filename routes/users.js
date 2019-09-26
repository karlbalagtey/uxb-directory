const express = require('express');

const router = express.Router();

/**
 * Supply a specified user
 */
router.get('/users/:userId', (req, res, next) => {
    res.send("<p>Specified user</p>");
});

/**
 * Supply the list of all users
 */
router.use('/users', (req, res, next) => {
    res.send("<p>All users</p>");
});

/**
 * Store newly created user  
 */ 
router.post('/users', (req, res, next) => {
    res.send("<p>Store a user</p>");
});


/**
 * Update a specified user 
 */
router.put('/users/:userId', (req, res, next) => {
    res.send("<p>Update a specified user</p>");
});


/**
 * Delete a specifed user
 */
router.use('/users/:userId', (req, res, next) => {
    res.send("<p>Delete a specified user</p>");
});

module.exports = router;
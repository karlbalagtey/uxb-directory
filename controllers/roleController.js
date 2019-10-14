const { validationResult } = require('express-validator');

// Requests
const storeRoleRequest = require('../requests/storeRoleRequest');
const updateRoleRequest = require('../requests/updateRoleRequest');

// Models
const Role = require('../models/roleModel');

/**
 * Returns specified role
 */
exports.getRole = (req, res, next) => {

    const roleId = req.params.roleId;

    Role.findOne({ "_id": roleId, deleted_at: null })
        .populate('users')
        .then(role => {
            return res.status(200).json(role);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Returns list of all role
 */
exports.getRoles = (req, res, next) => {

    Role.find({ deleted_at: null })
        .then(roles => {
            return res.status(200).json(roles);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Store new role in the storage 
 */
exports.storeRole = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {

        try {
            const newRole = storeRoleRequest.data(req);
            const role = new Role(newRole);
            role.save();

            res.status(201).json({
                message: 'Role created successfully.',
                role: role
            });

        } catch (err) {
            res.status(500).json({
                error: err
            });
        }



    } else {
        res.status(422).json(errors);
    }
}


/**
 * Update specified role details 
 */
exports.updateRole = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {

        const roleId = req.params.roleId;
        const name = req.body.name;

        Role.
            findOne({ "_id": roleId, deleted_at: null }).
            then(role => {

                Role.findOne({ "_id": { $ne: roleId }, name: name, deleted_at: null })
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
                                const updatedRole = updateRoleRequest.data(role, req);
                                updatedRole.save();

                                res.status(200).json({
                                    message: 'Role details updated successfully.',
                                    role: updatedRole
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
            }).
            catch(err => {
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
 * Delete specified role in the storage 
 */
exports.deleteRole = (req, res, next) => {

    const roleId = req.params.roleId;

    Role.findOne({ "_id": roleId, deleted_at: null })
        .then(role => {

            try {
                role.deleted_at = Date.now();
                role.deleted_by = 1;
                role.save();
            } catch (err) {
                res.status(404).json({
                    error: err
                });
            }

            res.status(200).json({
                message: 'Role deleted successfully.'
            });
        })
        .catch(err => {
            res.status(404).json({
                error: 'Role not found'
            });
        });
}


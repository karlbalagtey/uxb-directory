const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    client_id: { type: Number, required: true },
    role_id: { type: Number, required: false },
    title: String,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created: { 
        at: { type: Date, default: Date.now },
        by: { type: Number, default: null }
    },
    updated: { 
        at: { type: Date, default: null },
        by: { type: Number, default: null }
    },
    deleted: { 
        at: { type: Date, default: null },
        by: { type: Number, default: null }
    },
});

module.exports = mongoose.model('User', userSchema);
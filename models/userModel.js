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
    status: { type: String, default: 'active'},
    created_at: { type: Date, default: Date.now },
    created_by: { type: Number, default: null },
    updated_at: { type: Date, default: null },
    updated_by: { type: Number, default: null },
    deleted_at: { type: Date, default: null },
    deleted_by: { type: Number, default: null }
});

userSchema.statics = {
    isValid(id) {
       return this.findById(id)
              .then(result => {
                 if (!result) throw new Error('User not found')
       })
    },
 }

module.exports = mongoose.model('User', userSchema);
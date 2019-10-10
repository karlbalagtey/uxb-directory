const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
   client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
   name: { type: String, required: true },
   status: { type: String, default: 'active' },
   permissions: [
      module_id: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
      access: { type: Array, required: true }
   ],
   created_at: { type: Date, default: Date.now() },
   created_by: { type: Number },
   updated_at: { type: Date, default: null },
   updated_by: { type: Number, default: null },
   deleted_at: { type: Date, default: null },
   deleted_by: { type: Number, default: null }
});

roleSchema.statics = {
   isValid(id) {
      return this.findById(id)
         .then(role => {
            if (!role) {
               return Promise.reject('Role not found');
            }
         })
   },

   isNameAlreadyExist(name) {
      return this.exists({ name: name, deleted_at: null })
         .then(role => {
            if (role) {
               return Promise.reject('Role name already in use');
            }
         })
   }
}

module.exports = mongoose.model('Role', roleSchema);
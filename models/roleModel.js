const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
   name: { type: String, required: true },
   permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission'
      }
    ],
   status: { type: String, default: 'active' },
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
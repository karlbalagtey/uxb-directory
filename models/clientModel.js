const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
   name: { type: String, required: true },
   created_at: { type: Date, default: Date.now() },
   created_by: { type: Number },
   updated_at: { type: Date, default: null },
   updated_by: { type: Number, default: null },
   deleted_at: { type: Date, default: null },
   deleted_by: { type: Number, default: null }
});

clientSchema.statics = {
   isValid(id) {
      return this.findById(id)
         .then(client => {
            if (!client) {
               return Promise.reject('Client not found');
            }
         })
   },
   
   isNameAlreadyExist(name) {
      return this.exists({ name: name, deleted_at: null })
         .then(client => {
            if (client) {
               return Promise.reject('Name already in use');
            }
         })
   }
}

module.exports = mongoose.model('Client', clientSchema);
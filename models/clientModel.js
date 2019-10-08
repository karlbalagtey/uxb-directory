const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
   name: { type: String, required: true },
   status: { type: String, default: 'active' },
   users: [
      {
         type: Schema.Types.ObjectId,
         ref: 'User'
       }
   ],
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
   },

   addNewUser(clientId, userId) {
      return this.findById(clientId)
      .then(client => {
         if(!client.users.includes(userId)){
            client.users.push(userId);
            client.save();
         }
         return true;
      })
   }
}

module.exports = mongoose.model('Client', clientSchema);
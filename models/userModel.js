const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
   role_id: { type: Number, required: true },
   title: { type: String, default: null },
   first_name: { type: String, required: true },
   last_name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   status: { type: String, default: 'active' },
   created_at: { type: Date, default: Date.now() },
   created_by: { type: Number },
   updated_at: { type: Date, default: null },
   updated_by: { type: Number, default: null },
   deleted_at: { type: Date, default: null },
   deleted_by: { type: Number, default: null }
});

userSchema.statics = {
   isValid(id) {
      return this.findById(id)
         .then(user => {
            if (!user) {
               return Promise.reject('User not found');
            }
         })
   },
   
   isEmailAlreadyExist(email) {
      return this.exists({ email: email, deleted_at: null })
         .then(user => {
            if (user) {
               return Promise.reject('E-mail already in use');
            }
         })
   },

   
}

module.exports = mongoose.model('User', userSchema);
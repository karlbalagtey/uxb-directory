const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moduleSchema = new Schema({
   name: { type: String, required: true },
   slug: { type: String, required: true },
   created_at: { type: Date, default: Date.now() },
   created_by: { type: Number },
   updated_at: { type: Date, default: null },
   updated_by: { type: Number, default: null },
   deleted_at: { type: Date, default: null },
   deleted_by: { type: Number, default: null }
});

moduleSchema.statics = {
   isValid(id) {
      return this.findById(id)
         .then(appModule => {
            if (!appModule) {
               return Promise.reject('Module not found');
            }
         })
   }
}

module.exports = mongoose.model('Module', moduleSchema);
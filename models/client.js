var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var clientSchema = new Schema({  
  name:    { type: String },
  email:   { type: String },
  genre:   { type: String, enum: ['male', 'female'] },
  cx:      { type: String},
  cy:      { type: String}
});

module.exports = mongoose.model('Client', clientSchema);  
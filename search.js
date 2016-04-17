var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new Schema({
  term: { type: String },
  when: { type: Date } });

module.exports = mongoose.model('search', searchSchema);

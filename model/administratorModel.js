const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const Administrator = mongoose.model('Administrator', adminSchema);

module.exports = Administrator;

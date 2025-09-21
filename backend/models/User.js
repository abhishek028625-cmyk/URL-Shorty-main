// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // email unique hona chahiye
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
// models/Url.js
const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // User ki ID store karega
        ref: 'User' // Ye 'User' model se जुड़ा hai
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    urlCode: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Url', UrlSchema);
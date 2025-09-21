// index.js

// Sabse pehle environment variables load karo
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// URL model ko import karo redirect route ke liye
const Url = require('./models/Url');

const app = express();

// --- Middlewares ---
// Cross-Origin Resource Sharing ko enable karo
app.use(cors());
// JSON data ko padhne ke liye
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.error(err));

// --- API Routes ---
// Authentication routes (login/register)
app.use('/api/auth', require('./routes/auth'));
// URL-related routes (shorten/get urls)
app.use('/api/urls', require('./routes/urls'));

// --- Redirect Route ---
// Yeh route short URL ko original URL par redirect karta hai
// Example: http://localhost:5000/aB3xY7
app.get('/:code', async (req, res) => {
    try {
        // URL code se database mein entry dhundo
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            // Agar URL mil gaya, to uske clicks count ko 1 se badhao
            url.clicks++;
            await url.save();
            
            // Aur user ko original URL par bhej do
            return res.redirect(url.originalUrl);
        } else {
            // Agar URL nahi mila, to 404 error do
            return res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
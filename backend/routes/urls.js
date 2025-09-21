// routes/urls.js

const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');

// Middleware aur Model import karo
const auth = require('../middleware/auth');
const Url = require('../models/Url');

// --- NAYA URL SHORT KARNE WALA ROUTE ---
// @route   POST /api/urls/shorten
// @desc    Ek naya URL chota karna
// @access  Private (Login zaroori hai)
router.post('/shorten', auth, async (req, res) => {
    const { originalUrl } = req.body;

    // 1. Check karo ki user ne valid URL bheja hai ya nahi
    if (!validUrl.isUri(originalUrl)) {
        return res.status(400).json({ msg: 'Please provide a valid URL' });
    }

    // Aapka base URL, ise .env file mein daalna aacha practice hai
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    try {
        // 2. Check karo ki yeh URL pehle se is user ke liye database mein hai ya nahi
        let url = await Url.findOne({ originalUrl, user: req.user.id });

        if (url) {
            // Agar URL pehle se hai, to wahi wapas bhej do
            return res.json(url);
        }

        // 3. Agar naya URL hai, to ek unique code banao (e.g., aB3xY7)
        // **IMPORTANT:** Using dynamic import() to load nanoid because it's an ES Module.
        const { nanoid } = await import('nanoid');
        const urlCode = nanoid(7);

        // 4. Poora short URL banao
        const shortUrl = `${baseUrl}/${urlCode}`;

        // 5. Naya URL object banao aur database mein save karo
        url = new Url({
            originalUrl,
            shortUrl,
            urlCode,
            user: req.user.id, // User ki ID middleware se mil rahi hai
            date: new Date()
        });

        await url.save();
        res.status(201).json(url);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// --- USER KE SAARE URLS GET KARNE WALA ROUTE ---
// @route   GET /api/urls
// @desc    Logged-in user ke saare URLs get karna
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // Sirf uss user ke URLs dhundo jo logged-in hai (ID se)
        // Naye URLs ko sabse upar dikhane ke liye sort karo
        const urls = await Url.find({ user: req.user.id }).sort({ date: -1 });
        res.json(urls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
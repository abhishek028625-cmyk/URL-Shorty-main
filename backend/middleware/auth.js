// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Header se token nikalo
    const token = req.header('x-auth-token');

    // Agar token nahi hai to error bhejo
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Token ko verify karo
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // User ki ID ko request object mein daal do
        next(); // Sab sahi hai, to aage badho
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
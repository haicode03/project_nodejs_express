const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send('Access denied.');
    }
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(403).send('Invalid token.');
        req.user = decoded;
        next();
    });
};

module.exports = { verifyToken };

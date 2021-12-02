const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({msg: 'Unauthorized'});
    }
    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res.status(401).json({msg: 'Invalid token'});
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
};

module.exports = auth;

const jwt = require('jsonwebtoken');

function authVerification(req, res, next) {
    let token = req.get('Authorization');
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                Error: 'OK',
                result: err.message
            })
        }
        req.user = decoded.user;
        next();
    })
}

module.exports = authVerification;
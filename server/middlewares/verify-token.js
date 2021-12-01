const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let checkBearer = 'Bearer '

    if (token) {
        if (token.startsWith(checkBearer)) { // check if token contains "Bearer "
            token = token.slice(checkBearer.length, token.length);
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: "Failed to Authenticate" })
            } else {
                req.decoded = decoded;
                next()
            }
        })
    } else {
        res.json({ success: false, message: "No token provided" })
    }
}
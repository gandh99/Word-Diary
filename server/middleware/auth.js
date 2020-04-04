const jwt = require('jsonwebtoken');

export default (req, res, done) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            data: 'No token provided. Authorisation denied.'
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                data: 'Invalid token provided.'
            })
        }
        done()
    })
}
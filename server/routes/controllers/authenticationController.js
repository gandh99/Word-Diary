module.exports.register = (req, res, done) => {
    const { username, password } = req.body
    res.status(200).send(username)
}

module.exports.login = (req, res, done) => {

}
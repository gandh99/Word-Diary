module.exports.register = (req, res, done) => {
    console.log(req.body)
    res.status(200).send(req.body)
}

module.exports.login = (req, res, done) => {

}
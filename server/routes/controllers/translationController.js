const translate = require('@vitalets/google-translate-api')

module.exports.translate = (req, res, done) => {
    const { phrase } = req.body

    // Translate the phrase to English (default)
    translate(phrase, { to: 'en' })
        .then(result => {
            const translatedText = result.text
            res.status(200).json({
                success: true,
                data: translatedText
            })
        }).catch(err => {
            console.error(err)
            res.status(400).json({
                success: false,
                data: 'Unable to translate text.'
            })
        })
}
const translate = require('@vitalets/google-translate-api')
const DiaryPost = require('../../models/DiaryPost')

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

module.exports.addPost = (req, res, done) => {
    const { userData } = req.tokenData
    const username = userData.username
    const { phrase, translatedPhrase, note } = req.body

    // Save this post to the user's diary
    new DiaryPost({ username, phrase, translatedPhrase, note })
        .save()
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                data: 'Error adding diary post.'
            })
        })
}

module.exports.getPost = (req, res, done) => {
    const { userData } = req.tokenData
    const username = userData.username

    // Get all the posts belonging to the user
    DiaryPost.find({ username }, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                data: 'Error retrieving posts.'
            })
        }

        return res.status(200).json({
            success: true,
            data: result
        })
    })
        .sort({ starred: -1 })
}

module.exports.updatePost = (req, res, done) => {
    const { _id, phrase, translatedPhrase, note, starred } = req.body

    // Update the particular diary post using the _id provided
    DiaryPost.updateOne({ _id }, { phrase, translatedPhrase, note, starred }, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                data: 'Error updating post.'
            })
        }

        return res.status(200).json({
            success: true,
            data: 'Successfully updated post.'
        })
    })
}

module.exports.deletePost = (req, res, done) => {
    const _id = req.params.id

    // Delete the particular diary post using the _id provided
    DiaryPost.deleteOne({ _id }, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                data: 'Error deleting post.'
            })
        }

        return res.status(200).json({
            success: true,
            data: 'Successfully deleted post.'
        })
    })
}
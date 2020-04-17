const translate = require('@vitalets/google-translate-api')
const DiaryPost = require('../../models/DiaryPost')
const SharedDiaryPost = require('../../models/SharedDiaryPost')
const notificationsController = require('./notificationsController')

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
    const userId = userData._id
    const { phrase, translatedPhrase, note } = req.body

    // Save this post to the user's diary
    new DiaryPost({ creator: userId, phrase, translatedPhrase, note })
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
    const userId = userData._id

    // Get all the posts belonging to the user
    DiaryPost.find({ creator: userId }, (err, result) => {
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
}

module.exports.updatePost = (req, res, done) => {
    const { _id, phrase, translatedPhrase, note, starred } = req.body

    // Update the particular diary post using the _id provided
    DiaryPost
        .findByIdAndUpdate(_id, { phrase, translatedPhrase, note, starred }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error updating post.'
                })
            }

            return res.status(200).json({
                success: true,
                data: result
            })
        })
}

module.exports.deletePost = async (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData._id
    const _id = req.params.id

    // Delete any related shared posts
    SharedDiaryPost
        .deleteMany({ post: _id, creator: userId },
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        data: 'Unable to all instances of shared posts relating to the post that was to be deleted.'
                    })
                }
            }
        )

    // Delete the particular diary post using the _id provided
    DiaryPost.findOneAndRemove({ _id, creator: userId }, (err, deletedPost) => {
        if (err) {
            return res.status(400).json({
                success: false,
                data: 'Error deleting post.'
            })
        }

        return res.status(200).json({
            success: true,
            data: deletedPost
        })
    })
}

module.exports.sharePost = async (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData._id
    const { post, recipient } = req.body

    // Create a SharedDiaryPost
    const sharedDiaryPost = await SharedDiaryPost.findOneAndUpdate(
        { post, creator: userId, recipient },
        { post, creator: userId, recipient },
        { upsert: true, new: true, useFindAndModify: false }
    )

    // Create a notification
    notificationsController.createSharedDiaryPostNotification(sharedDiaryPost, userId, recipient)

    return res.status(200).json({
        success: true,
        data: sharedDiaryPost
    })
}

module.exports.getPostsSharedWithMe = (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData._id

    SharedDiaryPost
        .find(
            { recipient: userId },
            (err, sharedDiaryPosts) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        data: 'Error retrieving diary posts shared with me.'
                    })
                }
            }
        )
        .populate('post creator recipient')      // essentially a JOIN + SELECT statement
        .exec((err, sharedDiaryPosts) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error retrieving diary posts shared with me.'
                })
            }

            return res.status(200).json({
                success: true,
                data: sharedDiaryPosts
            })
        })
}

module.exports.respondToPostSharedWithMe = async (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData._id
    const { creator, post } = req.body.sharedPost

    // Extract post data
    const { phrase, translatedPhrase, note, starred } = post

    // Add the post to the user's diary
    const affectedPost =
        await new DiaryPost({
            creator: userId,
            phrase,
            translatedPhrase,
            note,
            starred,
            sharedBy: creator._id
        })
            .save()

    // Remove the SharedDiaryPost document
    await SharedDiaryPost
        .findOneAndRemove({
            creator: creator._id,
            post: post._id,
            recipient: userId
        }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: 'Error removing the diary post shared with me.'
                })
            }
        })

    return res.status(200).json({
        success: true,
        data: affectedPost
    })
}

module.exports.deleteSharedPost = (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData._id
    const _id = req.params.id

    // Delete any related shared posts
    SharedDiaryPost
        .findOneAndRemove({ _id, recipient: userId },
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        data: 'Unable to delete the shared post.'
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: result
                })
            }
        )
}
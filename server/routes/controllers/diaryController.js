const translate = require('@vitalets/google-translate-api')
const DiaryPost = require('../../models/DiaryPost')
const SharedDiaryPost = require('../../models/SharedDiaryPost')
const notificationsController = require('./notificationsController')
const io = require('../../config/setupIO')

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

module.exports.addPost = async (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData._id
    const { phrase, translatedPhrase, note } = req.body

    try {
        const newDiaryPost = await addDiaryPost(userId, phrase, translatedPhrase, note, null)
        return res.status(200).json({
            success: true,
            data: newDiaryPost
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data: 'Error adding diary post.'
        })
    }
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
    await notificationsController.createSharedDiaryPostNotification(sharedDiaryPost, userId, recipient)

    // Send a signal to the recipient
    io.sendRefreshSignal(recipient)

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
    const { phrase, translatedPhrase, note } = post

    let newDiaryPost
    try {
        // Add the post to the user's diary and delete the SharedDiaryPost
        newDiaryPost = await addDiaryPost(userId, phrase, translatedPhrase, note, creator._id)
        await deleteSharedDiaryPost(null, creator._id, post._id, userId)


        return res.status(200).json({
            success: true,
            data: newDiaryPost
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: 'Error adding shared diary post to user\'s own diary.'
        })
    }
}

module.exports.deleteSharedPost = async (req, res, done) => {
    const { userData } = req.tokenData
    const userId = userData._id
    const _id = req.params.id

    // Delete the shared diary post
    try {
        const deletedSharedDiaryPost = await deleteSharedDiaryPost(_id, null, null, userId)

        return res.status(200).json({
            success: true,
            data: deletedSharedDiaryPost
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: 'Error deleting shared diary post.'
        })
    }
}

module.exports.getFriendsPosts = (req, res, done) => {
    const { userData } = req.tokenData
    const friendId = req.params.id

    // Get all the posts belonging to the friend
    DiaryPost.find({ creator: friendId }, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                data: 'Error retrieving friend\'s posts.'
            })
        }

        return res.status(200).json({
            success: true,
            data: result
        })
    })
}

// Add the post to the user's diary
const addDiaryPost = async (creator, phrase, translatedPhrase, note, sharedBy) => {
    const affectedPost =
        new DiaryPost({
            creator,
            phrase,
            translatedPhrase,
            note,
            sharedBy
        })
            .save()

    return affectedPost
}

// Delete a particular SharedDiaryPost
const deleteSharedDiaryPost = async (_id, creator, post, recipient) => {
    // Manually build the query to remove null arguments
    let query = {}
    if (_id) query._id = _id
    if (creator) query.creator = creator
    if (post) query.post = post
    if (recipient) query.recipient = recipient

    const deletedSharedDiaryPost =
        SharedDiaryPost
            .findOneAndRemove(query)

    return deletedSharedDiaryPost
}
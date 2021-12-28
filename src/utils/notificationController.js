const asyncMiddleware = require('../middleware/asyncMiddleware')
const Notification = require('../models/notifications')

const createNotification = asyncMiddleware(async(req, res) => {

    const notification = new Notification(req.body)

    await notification.save()
    res.send(notification)
})
const getNotifications = asyncMiddleware(async(req, res) => {

    const notifications = await Notification.find()
    res.send(notifications)
})
const getNotification = asyncMiddleware(async(req, res) => {

    const notification = await Notification.findById(req.params.id)
    res.send(notification)
})
const deleteNotifications = asyncMiddleware(async(req, res) => {

    const notifications = await Notification.deleteMany()
    res.send(notifications)
})
const deleteNotification = asyncMiddleware(async(req, res) => {

    const notification = await Notification.findByIdAndDelete(req.params.id)
    res.send(notification)
})

module.exports = {
    createNotification,
    getNotifications,
    getNotification,
    deleteNotifications,
    deleteNotification
}
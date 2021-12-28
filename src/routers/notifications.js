const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createNotification, getNotifications, getNotification, deleteNotification, deleteNotifications } = require("../utils/notificationController");


// create notification
router.post('/create', createNotification)

// read notification
router.get('/document', getNotifications)

// read single notification
router.get('/document/:id', getNotification)

// delete single notification
router.delete('/remove/:id', deleteNotification)

// delete all notification
router.delete('/remove', deleteNotifications)

module.exports = router;

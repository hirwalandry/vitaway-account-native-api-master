const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createMessage, readMessage, updateMessage, deleteMessages, deleteAmessage } = require("../utils/messagesController");

// create message
router.post('/create', Auth, createMessage)

// read message
router.get('/message', Auth, readMessage)

// update message
router.patch('/update/:id', Auth, updateMessage)

// delete message
router.delete('/remove', Auth, deleteMessages)

// delete single message
router.delete('/remove/:id', Auth, deleteAmessage)

module.exports = router;

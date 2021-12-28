const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createGroup, getGroups, getGroup, updateGroup, deleteGroups, deleteGroup } = require('../utils/groupsController')

// create group
router.post('/create', Auth, createGroup)

// get groups
router.get('/document', Auth, getGroups)

// get single group info
router.get('/document/:id', Auth, getGroup)

// update group
router.patch('/update/:id', Auth, updateGroup)

// delete all groups
router.delete('/remove', Auth, deleteGroups)

// delete single group
router.delete('/remove/:id', Auth, deleteGroup)

module.exports = router;

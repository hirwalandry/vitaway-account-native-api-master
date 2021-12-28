const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createMember,getMembers,getMember,deleteMember,deleteMembers } = require('../utils/group_memberController')

// create member
router.post('/create', Auth, createMember)

// get all member based on group
router.get('/document/:groupId', Auth, getMembers)

// get single member based group
router.get('/document/:groupId/:id', Auth, getMember)

// delete group member based on
router.delete('/remove/:groupId/:id', Auth, deleteMember)

// delete all member
router.delete('/remove/:groupId', Auth, deleteMembers)

module.exports = router;

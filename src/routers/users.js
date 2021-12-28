const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const { createUser, loginUser, logoutUser, getUser, verifiedUser, updateUser, deleteUser } = require("../utils/userController");
const User = require('../models/users')

// create user
router.post('/create', createUser);

// login user
router.post("/login", loginUser);

// logout user
router.post("/logout", Auth, logoutUser);

// read single user
router.get("/document/:id", Auth, getUser);

// read all users
router.get("/document", Auth, verifiedUser);

// update user
router.patch("/update/:id", Auth, updateUser);

// delete user
router.delete("/remove/:id", Auth, deleteUser);

// sleep user / delete user tempolary
router.patch("/sleep", Auth, async (req, res) => {
    // still underconstruction
});

module.exports = router;

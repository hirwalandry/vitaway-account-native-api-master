const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createCategory, getCategory, deleteCategory, updateCategory } = require("../utils/categoryController");

// create category
router.post('/create', Auth, createCategory)

// get category
router.get('/document', Auth, getCategory)

// delete category
router.delete('/remove', Auth, deleteCategory)

// update category
router.patch('/update', Auth, updateCategory)

module.exports = router;

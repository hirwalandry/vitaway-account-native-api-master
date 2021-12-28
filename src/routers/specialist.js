const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createSpecialist, getSpecialist, getSpecialists, updateSpecialist, deleteSpecialist, deleteSpecialists } = require("../utils/specialistController");

// create specialist
router.post('/create', Auth, createSpecialist)

// read speicialist (single)
router.get('/document/:id', Auth, getSpecialist)

// read all specialist
router.get('/document', Auth, getSpecialists)

// update specialist
router.patch('/update/:id',Auth, updateSpecialist)

// delete single specialist
router.delete('/remove/:id',Auth, deleteSpecialist)

// delete all specialist
router.delete('/remove',Auth, deleteSpecialists)

module.exports = router;

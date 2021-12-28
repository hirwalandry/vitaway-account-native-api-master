const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createMedical_rec, getAllMedical_rec, getAmedical_rec, updateMedical_rec, deleteAmedical_rec, deleteAllMedical_rec } = require("../utils/medical_recController");

// create record
router.post('/create', Auth, createMedical_rec)

// get medical rec
router.get('/document', Auth, getAllMedical_rec)

// get single rec
router.get('/document/:id', Auth, getAmedical_rec)

// update rec
router.patch('/update/:id', Auth, updateMedical_rec)

// delete single rec
router.delete('/remove/:id', Auth, deleteAmedical_rec)

// delete all rec
router.delete('/remove', Auth, deleteAllMedical_rec)

module.exports = router;

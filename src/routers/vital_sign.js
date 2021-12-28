const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const { createVitalSign, getVitalSign, getVitalSigns, updateVitalSign, deleteVitalSign, deleteVitalSigns } = require("../utils/vital_signController");

// create user vital sign
router.post('/create',Auth, createVitalSign)

// read single row of vital sign
router.get('/document/:id',Auth, getVitalSign)

// read all vital signs
router.get('/document',Auth, getVitalSigns)

// update single sign
router.patch('/update/:id',Auth, updateVitalSign)

// delete single sing
router.delete('/remove/:id', Auth, deleteVitalSign)

// delete all signs
router.delete('/remove', Auth, deleteVitalSigns)

module.exports = router;
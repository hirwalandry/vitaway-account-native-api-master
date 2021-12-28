const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createPlan, getPlans, getPlan, deletePlans, deletePlan, updatePlan } = require("../utils/planController");

// create a plan
router.post('/create', Auth, createPlan)

// read a plan
router.get('/document', Auth, getPlans)

// read single plan
router.get('/document/:id', Auth, getPlan)

// delete a plan
router.delete('/remove', Auth, deletePlans)

// delete single plan
router.delete('/remove/:id', Auth, deletePlan)

// update plan
router.patch('/update/:id', Auth, updatePlan)

module.exports = router;

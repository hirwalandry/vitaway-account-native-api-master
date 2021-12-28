const express = require("express");
const router = new express.Router();
const Auth = require("../middleware/authorize");
const jwt = require('jsonwebtoken');
const { createGoal, getAllGoals, getGoal, updateGoal, deleteGoals, deleteGoal } = require('../utils/goalsController');

// create goal
router.post('/create', Auth, createGoal)

// get all goal
router.get('/document', Auth, getAllGoals)

// get single goal
router.get('/document/:id', Auth, getGoal)

// update goal
router.patch('/update/:id', Auth, updateGoal)

// delete goal
router.delete('/remove', Auth, deleteGoals)

// delete single goal
router.delete('/remove/:id', Auth, deleteGoal)

module.exports = router;

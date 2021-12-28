const asyncMiddleware = require('../middleware/asyncMiddleware')
const Goal = require('../models/goals')


const createGoal = asyncMiddleware(async(req, res) => {
    const goal = new Goal(req.body)

    await goal.save()
    res.status(201).send(goal)

})
const getAllGoals = asyncMiddleware(async(req, res) => {
    const goals = await Goal.find()
    res.send(goals)
})
const getGoal = asyncMiddleware(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        throw new Error('goal not found')
    }
    res.send(goal)
})
const updateGoal = asyncMiddleware(async(req, res) =>{
    const updates = Object.keys(req.body)

    const goal = await Goal.findById(req.params.id)
    updates.forEach((update) => goal[update] = req.body[update])
    await goal.save()
    res.send(goal)
})
const deleteGoals = asyncMiddleware(async(req, res) => {
    const goal = await Goal.deleteMany()
    res.send(goal)
})
const deleteGoal = asyncMiddleware(async(req, res) => {
    const goal = await Goal.findByIdAndDelete(req.params.id)
    res.send(goal)
})

module.exports = {
    createGoal,
    getAllGoals,
    getGoal,
    updateGoal,
    deleteGoals,
    deleteGoal
}
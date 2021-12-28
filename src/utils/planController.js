const asyncMiddleware = require('../middleware/asyncMiddleware')
const Plan  = require('../models/plan')

const createPlan = asyncMiddleware(async(req, res) => {

    const plan = new Plan(req.body)

    await plan.save()
    res.send(plan)
})
const getPlans = asyncMiddleware(async(req, res) => {

    const plans = await Plan.find({})
    res.send(plans)
})
const getPlan = asyncMiddleware(async(req, res) => {

    const plan = await Plan.findById(req.params.id)
    res.send(plan)
})
const deletePlans = asyncMiddleware(async(req, res) => {

    const plans = await Plan.deleteMany()
    res.send(plans)
})
const deletePlan = asyncMiddleware(async(req, res) => {

    const plan = await Plan.findByIdAndDelete(req.params.id)
    res.send(plan)
})
const updatePlan = asyncMiddleware(async(req, res) => {

    const updates = Object.keys(req.body)

    const plan = await Plan.findById(req.params.id)
    updates.forEach(update => plan[update] = req.body[update])
    await plan.save()
    res.send(plan)
})

module.exports = {
    createPlan,
    getPlans,
    getPlan,
    deletePlans,
    deletePlan,
    updatePlan
}
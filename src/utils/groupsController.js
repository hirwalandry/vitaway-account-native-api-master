const asyncMiddleware = require('../middleware/asyncMiddleware')
const Group = require('../models/groups')

const createGroup = asyncMiddleware(async(req, res) => {
    const group = new Group(req.body)

    await group.save()
    res.send(group)
})
const getGroups = asyncMiddleware(async(req, res) => {
    const group = await Group.find()
    res.send(group)
})
const getGroup = asyncMiddleware(async(req, res) => {
    const group = await Group.findById(req.params.id)
    res.send(group)
})
const updateGroup = asyncMiddleware(async(req, res) => {
    const updates = Object.keys(req.body)

    const group = await Group.findById(req.params.id)
    updates.forEach((update) => group[update] = req.body[update])
    await group.save()
    res.send(group)
})
const deleteGroups = asyncMiddleware(async(req, res) => {
    const group = await Group.deleteMany()
    res.send(group)
})
const deleteGroup = asyncMiddleware(async(req, res) => {
    const group = await Group.findByIdAndDelete(req.params.id)
    res.send(group)
})
 
module.exports = {
    createGroup,
    getGroups,
    getGroup,
    updateGroup,
    deleteGroups,
    deleteGroup
}
const asyncMiddleware = require('../middleware/asyncMiddleware')
const Member = require('../models/group_member')

const createMember = asyncMiddleware(async(req, res) => {
    const member = new Member(req.body)
    await member.save()
    res.send(member)
})
const getMembers = asyncMiddleware(async(req, res) => {
    const member = await Member.find(req.params.id)
    res.send(member)
})
const getMember = asyncMiddleware(async(req, res) =>{
    const member = await Member.findOne({groupName:req.params.id, _id: req.params.id})
    res.send(member)

})
const deleteMember = asyncMiddleware(async(req, res) => {
    const member = await Member.findOneAndDelete({groupName: req.params.id, _id: req.params.id})
    res.send(member)
})
const deleteMembers = asyncMiddleware(async(req, res) => {
    const member = await Member.deleteMany({groupName: req.params.id})
    res.send(member)
})

module.exports = {
    createMember,
    getMembers,
    getMember,
    deleteMember,
    deleteMembers
}
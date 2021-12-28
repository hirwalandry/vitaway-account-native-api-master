const asyncMiddleware = require('../middleware/asyncMiddleware')
const Specialist  = require('../models/specialist')

const createSpecialist = asyncMiddleware(async(req, res) => {
    
    const specialist = new Specialist(req.body)

    await specialist.save()
    res.send(specialist)
})
const getSpecialist = asyncMiddleware(async(req, res) => {

    const specialist = await Specialist.findById(req.params.id)
    res.send(specialist)
}) 
const getSpecialists = asyncMiddleware(async(req, res) => {

    const specialist = await Specialist.find(req.params.id)
    res.send(specialist)
})
const updateSpecialist = asyncMiddleware(async(req, res) => {
    const updates = Object.keys(req.body)

    const specialist= await Specialist.findById(req.params.id)
    updates.forEach(update => specialist[update] = req.body[update])
    await specialist.save()
    res.send(specialist)
})
const deleteSpecialist = asyncMiddleware(async(req, res) => {

    const specialist = await Specialist.findByIdAndDelete(req.params.id)
    res.send(specialist)
})
const deleteSpecialists = asyncMiddleware(async(req, res) => {

    const specialist = await Specialist.deleteMany()
    res.send(specialist)
})

module.exports = {
    createSpecialist,
    getSpecialist,
    getSpecialists,
    updateSpecialist,
    deleteSpecialist,
    deleteSpecialists
}
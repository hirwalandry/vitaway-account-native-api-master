const asyncMiddleware = require('../middleware/asyncMiddleware')
const VitalSign = require('../models/vital_sign')

const createVitalSign = asyncMiddleware(async(req, res) => {

    const vital_sign = new VitalSign(req.body)

    await vital_sign.save()
    res.send(vital_sign)
})
const getVitalSign = asyncMiddleware(async(req, res) => {

    const vital_sign = await VitalSign.findById(req.params.id)
    res.send(vital_sign)
})
const getVitalSigns = asyncMiddleware(async(req, res) => {

    const vital_sign = await VitalSign.find({})
    res.send(vital_sign)
})
const updateVitalSign = asyncMiddleware(async(req, res) => {

    const updates = Object.keys(req.body)

    const vital_sign = await VitalSign.findById(req.params.id)
    updates.forEach(update => vital_sign[update] = req.body[update])
    await vital_sign.save()
    res.send(vital_sign)
})
const deleteVitalSign = asyncMiddleware(async(req, res) => {

    const vital_sign = await VitalSign.findByIdAndDelete(req.params.id)
    res.send(vital_sign)
})
const deleteVitalSigns = asyncMiddleware(async(req, res, next) => {

    const vital_sign = await VitalSign.deleteMany()
    res.send({message: 'delete many succeed', error: false, vital_sign})
})

module.exports = {
    createVitalSign,
    getVitalSign,
    getVitalSigns,
    updateVitalSign,
    deleteVitalSign,
    deleteVitalSigns
}
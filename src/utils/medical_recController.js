const asyncMiddleware = require('../middleware/asyncMiddleware')
const MedicalRec = require('../models/medical_rec')

const createMedical_rec = asyncMiddleware(async(req, res) => {

    const medical_rec = new MedicalRec(req.body)

    await medical_rec.save()
    res.status(201).send(medical_rec)
})
const getAllMedical_rec = asyncMiddleware(async(req, res) => {

    const medical_rec = await MedicalRec.find()
    res.send(medical_rec)
})
const getAmedical_rec = asyncMiddleware(async(req, res) => {
    
    const medical_rec = await MedicalRec.findById(req.params.id)
    res.send(medical_rec)
})
const updateMedical_rec = asyncMiddleware(async(req, res) => {
    const updates = Object.keys(req.body)

    const medical_rec = await MedicalRec.findById(req.params.id)
    updates.forEach(update => medical_rec[update] = req.body[update])
    await medical_rec.save()
    res.send(medical_rec)
})
const deleteAmedical_rec = asyncMiddleware(async(req, res) => {
    const medical_rec = await MedicalRec.findByIdAndDelete(req.params.id)
    res.send(medical_rec)
})
const deleteAllMedical_rec = asyncMiddleware(async(req, res) => {
    const medical_rec = await MedicalRec.deleteMany(req.params.id)
    res.send(medical_rec)
})

module.exports = {
    createMedical_rec,
    getAllMedical_rec,
    getAmedical_rec,
    updateMedical_rec,
    deleteAmedical_rec,
    deleteAllMedical_rec

}
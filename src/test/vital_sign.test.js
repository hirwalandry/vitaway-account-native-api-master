const request = require('supertest')
const app = require('../app')
const VitalSign = require('../models/vital_sign')
const { userOne, userOneId, vital_sign, databaseServer } = require('./userDb')

describe('vitalSignApi', () => {

    beforeEach(databaseServer)
    describe('createVitalSign', () => {
        it('should create vital sign', async() => {
            const res = await request(app)
            .post('/api/vital_sign/create')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "BMI": "a donno",
                "Systolic": "a donno",
                "Diastolic": "a donno",
                "BloodGlucose": "a donno",
                "Owner": userOneId,
                "Active": true

            })
            expect(res.status).toBe(200)
        })
    })
    describe('getVitalSign', () => {
        it('should get VitalSign', async() => {
            const res = await request(app)
            .get(`/api/vital_sign/document/${vital_sign._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('getVitalSigns', () => {
        it('should get VitalSigns', async() => {
            const res = await request(app)
            .get(`/api/vital_sign/document`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('updateVitalSigns', () => {
        it('should update VitalSigns', async() => {
            const res = await request(app)
            .patch(`/api/vital_sign/update/${vital_sign._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "BMI": "yes a donno"
            })
            expect(res.status).toBe(200)
            expect(res.body.BMI).toBe("yes a donno")
        })
    })
    describe('deleteVitalSign', () => {
        it('should delete VitalSign', async() => {
            const res = await request(app)
            .delete(`/api/vital_sign/remove/${vital_sign._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('deleteVitalSigns', () => {
        it('should delete VitalSigns', async() => {
            const res = await request(app)
            .delete(`/api/vital_sign/remove`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
            expect(res.body.message).toEqual('delete many succeed')
        })
    })

})
const request = require('supertest')
const app = require('../app')
const Plan = require('../models/plan')
const { userOne, specialist, plan, databaseServer } = require('./userDb')
describe('planApi', () => {

    beforeEach(databaseServer)
    describe('createPlan', () => {
        it('should create plan', async() => {
            const res = await request(app)
            .post('/api/plan/create')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Name": "land",
                "Description": "create plan1",
                "Start": "monday",
                "End": "wednesday",
                "specialistOwner": specialist._id,
                "userOwner": userOne._id,
                "Active": true
            })
            expect(res.status).toBe(200)
        })
    })
    describe('getPlans', () => {
        it('should read plans', async() => {
            const res = await request(app)
            .get('/api/plan/document')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('getPlan', () => {
        it('should read plan', async() => {
            const res = await request(app)
            .get(`/api/plan/document/${plan._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('deletePlans', () => {
        it('should delete plans', async() => {
            const res = await request(app)
            .delete('/api/plan/remove')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('deletePlan', () => {
        it('should delete plan', async() => {
            const res = await request(app)
            .delete(`/api/plan/remove/${plan._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('updatePlan', () => {
        it('should update plan', async() => {
            const res = await request(app)
            .patch(`/api/plan/update/${plan._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Name": "rob the bank"
            })
            expect(res.status).toBe(200)
            expect(res.body.Name).toBe("rob the bank")
        })
    })
})
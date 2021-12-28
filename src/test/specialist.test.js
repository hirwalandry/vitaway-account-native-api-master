const request = require('supertest')
const app = require('../app')
const Specialist = require('../models/specialist')
const { userOne, category,specialist, databaseServer } = require('./userDb')

describe('specialistApi', () => {

    beforeEach(databaseServer)
    describe('createSpecialist', () => {
        it('should create specialist', async() => {
           const res = await request(app)
           .post('/api/specialist/create')
           .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
           .send({
               "Name": "kiki",
               "Email": "manirabonapatient333@gmail.com",
               "Section": "two",
               "categoryOwner": category._id,
               "Active": true
           })
           expect(res.status).toBe(200)
        })
    })
    describe('getSpecialist', () => {
        it('should get a Specialist', async() => {
            const res = await request(app)
            .get(`/api/specialist/document/${specialist._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('getSpecialists', () => {
        it('should get Specialists', async() => {
            const res = await request(app)
            .get(`/api/specialist/document`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('updateSpecialists', () => {
        it('should update a Specialist', async() => {
            const res = await request(app)
            .patch(`/api/specialist/update/${specialist._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Name": "lala"
            })
            expect(res.status).toBe(200)
            expect(res.body.Name).toBe("lala")
        })
    })
    describe('deleteSpecialist', () => {
        it('should delete a Specialist', async() => {
            const res = await request(app)
            .delete(`/api/specialist/remove/${specialist._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('deleteSpecialists', () => {
        it('should delete a Specialists', async() => {
            const res = await request(app)
            .delete(`/api/specialist/remove`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
})
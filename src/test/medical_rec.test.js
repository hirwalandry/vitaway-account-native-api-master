const request  = require('supertest')
const app = require('../app')
const MedicalRec = require('../models/medical_rec')
const { userOne, userOneId, medical_rec, databaseServer } = require('./userDb')

describe('medical_recApi', () => {
    beforeEach(databaseServer)
    describe('createMedical_rec', () => {
        it('should create a medical_rec', async() => {
            const res = await request(app)
            .post('/api/medical_rec/create')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Owner": userOneId,
            })
            expect(res.status).toBe(201)
        })   
    })
    describe('getAllmedical_rec', () => {
        it('should return a medical_rec', async() => {
            const res = await request(app)
            .get('/api/medical_rec/document')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toEqual(200)
        })
    })
    describe('getAmedical_rec', () => {
        it('should return all medical_rec', async() => {
            const res = await request(app)
            .get(`/api/medical_rec/document/${medical_rec._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('updateAmedical_rec', () => {
        it('should update a medical_rec', async() => {
            const res = await request(app)
            .patch(`/api/medical_rec/update/${medical_rec._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Name": "kanaka"
            })
            expect(res.status).toBe(200)
            expect(res.body.Name).toBe("kanaka")
        })
    })
    describe('deleteAmedical_rec', () => {
        it('should delete a medical_rec', async() => {
            const res = await request(app)
            .delete(`/api/medical_rec/remove/${medical_rec._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({})
            expect(res.status).toBe(200)
        })
    })
    describe('deleteAllMedical_rec', () => {
        it('should delete all medical_rec', async() => {
            const res = await request(app)
            .delete('/api/medical_rec/remove')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
})
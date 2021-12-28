const request = require('supertest')
const Goal = require('../models/goals')
const app = require('../app')
const { userOne, goal, databaseServer } = require('./userDb')

describe('goalApi', () => {
    beforeEach(databaseServer)
    describe('createGoal', () => {
        it('should create goal', async() =>{
            const res = await request(app)
            .post('/api/goal/create')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Name" : "landry",
                "Start" : "tuesday",
                "End" : "wednesday",
                "Active": true

            })
            expect(res.status).toBe(201)
        } )
    })
    describe('getAllGoal', () => {
        it('should return all goal', async() => {
            const res = await request(app)
            .get('/api/goal/document')
            .set("Authorization", `${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('getGoal', () => {
        it('should return goal', async() => {
            const res = await request(app)
            .get(`/api/goal/document/${goal._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('updateGoal', () => {
        it('should update a goal', async() => {
            const res = await request(app)
            .patch(`/api/goal/update/${goal._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Name": "kiki"
            })
            expect(res.status).toBe(200)
            expect(res.body.Name).toBe("kiki")
        })
    })
    describe('removeAllGoal', () => {
        it('should remove goal', async() => {
            const res = await request(app)
            .delete('/api/goal/remove')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('removeGoal', () => {
        it('should should return a goal', async() => {
            const res = await request(app)
            .delete(`/api/goal/remove/${goal._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    
})


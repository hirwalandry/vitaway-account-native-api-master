const request = require('supertest')
const app = require('../app')
const Group = require('../models/groups')
const { userOne, userOneId, group, category, databaseServer } = require('./userDb')

describe('groupApi', () => {
    beforeEach(databaseServer)
    describe('createGroup', () => {
        it('should create group', async() =>{
            const res = await request(app)
            .post('/api/group/create')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Name": "lando",
                "Owner": category._id,
                "Active": true

            })
            expect(res.status).toEqual(200)
        })
    })
    describe('getAllGroup', () => {
        it('should get all the groups', async() => {
            const res = await request(app)
            .get('/api/group/document')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('getGroup', () => {
        it('should get a group', async() => {
            const res = await request(app)
            .get(`/api/group/document/${group._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toEqual(200)
        })
        
    })
    describe('updateGroup', () => {
        it('should update group', async() => {
            const res = await request(app)
            .patch(`/api/group/update/${group._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Name": "kiki"
            })
            expect(res.status).toBe(200)
            expect(res.body.Name).toBe("kiki")
        })
    })
    describe('deleteAllGroup', () => {
        it('should delete all group', async() => {
            const res = await request(app)
            .delete('/api/group/remove')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({})
            expect(res.status).toEqual(200)
        })
    })
    describe('deleteGroup', () => {
        it('should delete a group', async() => {
            const res = await request(app)
            .delete(`/api/group/remove/${group._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .expect(200)
        })
    }) 
})
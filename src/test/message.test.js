const request = require('supertest')
const app = require('../app')
const Message = require('../models/messages')
const { userOne, userOneId, group, message, databaseServer } = require('./userDb')

describe('messageApi', () => {
    
    beforeEach(databaseServer)
    describe('createMessage', () => {
        it('should create message', async() => {
            const res = await request(app)
            .post('/api/message/create')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Message": "me and you",
                "groupOwner": group._id,
                "userOwner": userOneId
            })
            expect(res.status).toBe(201)
        })
    })
    describe('readMeassage', () => {
        it('should read a message', async() => {
            const res = await request(app)
            .get('/api/message/message')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toEqual(200)
        })
    })
    describe('updateMessage', () => {
        it('should update message', async() =>{
            const res = await request(app)
            .patch(`/api/message/update/${message._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Message": "hey patient"
            })
            expect(res.status).toBe(200)
            expect(res.body.Message).toEqual("hey patient")
        })
    })
    describe('deleteMessages', () => {
        it('should delete message', async() => {
            const res = await request(app)
            .delete('/api/message/remove')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({})
            expect(res.status).toEqual(200)
        })
    })
    describe('deleteAmessage', () => {
        it('should delete a message', async() => {
            const res = await request(app)
            .delete(`/api/message/remove/${message._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    
})
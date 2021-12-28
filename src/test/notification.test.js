const request = require('supertest')
const app = require('../app')
const Notification = require('../models/notifications')
const { userOne, userOneId, notification, databaseServer } = require('./userDb')

describe('notificationApi', () => {

    beforeEach(databaseServer)
    describe('createNotification', () => {
        it('should create notification', async() => {
            const res = await request(app)
            .post('/api/notification/create')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Message": "hey dev",
                "Readed": true,
                "Owner": userOneId,
                "Active": true
            })
            expect(res.status).toBe(200)
        })
    })
    describe('getNotifications', () => {
        it('should return all notification', async() => {
            const res = await request(app)
            .get('/api/notification/document')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('getNotification', () => {
        it('should return a notification', async() => {
            const res = await request(app)
            .get(`/api/notification/document/${notification._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('removeNotification', () => {
        it('should delete a notication', async() => {
            const res = await request(app)
            .delete(`/api/notification/remove/${notification._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('removeNotifications', () => {
        it('should delete notifications', async() => {
            const res = await request(app)
            .delete('/api/notification/remove')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toEqual(200)
        })
    })
})
const request = require('supertest')
const app = require('../app')
const Member = require('../models/group_member')
const { userOne, userOneId, group, group_member, databaseServer } = require('./userDb')

describe('group_memberApi', () => {
    beforeEach(databaseServer)
    describe('createMember', () => {
        it('should create group', async() => {
            const res = await request(app)
            .post(`/api/group_member/create`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "groupOwner": group._id,
                "userOwner": userOneId,
                "Active": true 
            })
            expect(res.status).toBe(200)
        })
    })
    describe('getUserInGroup', () => {
        it('should return all user in group', async() => {
            const res = await request(app)
            .get(`/api/group_member/document/${group._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('getAuserInGroup', () => {
        it('should return a user in group', async() => {
            const res = await request(app)
            .get(`/api/group_member/document/${group._id}/${group_member._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('removeUserFromGroup', () => {
        it('should delete user from group', async() =>{
            const res = await request(app)
            .delete(`/api/group_member/remove/${group._id}/${group_member._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('removeAllUserFromGroup', () => {
        it('should remove all user from group', async() => {
            const res = await request(app)
            .delete(`/api/group_member/remove/${group._id}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
})
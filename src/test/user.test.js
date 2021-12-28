const request = require('supertest')
const app = require('../app')
const User = require('../models/users')
const { userOneId, userOne, userTwoId, userTwo, databaseServer } = require('./userDb')

describe('userApi', ()=> {
    beforeEach(databaseServer)
    describe('createUser', () => {
        it('should create user', async() =>{
            const res = await request(app)
            .post('/api/user/create')
            .send({
                "Firstname": "nshuti",
                "Lastname": "landry",
                "Email": "hirwalandry@gmail.com",
                "Password": "landry12345",
                "VerificationCode": "123536",
                "Contact": "09309274843",
                "HealthySection": "am good" 
            })
            expect(res.status).toEqual(201)
        })
    })
    describe('loginUser', () => {
        it('should login user', async() => {
            const res = await request(app)
            .post('/api/user/login')
            .send({
                Email : userOne.Email,
                Password : userOne.Password,
            })
            expect(res.status).toBe(200)
        })
    })
    describe('logoutUser', () => {
        it('should logout user', async() => {
            const res = await request(app)
            .post('/api/user/logout')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
             expect(res.status).toBe(200)
        })
    })
    describe('getUser', () => {
        it('should get user', async() =>{
            const res = await request(app)
            .get(`/api/user/document/${userTwoId}`)
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('verifiedUser', () => {
        it('should verify user', async() => {
            const res = await request(app)
            .get('/api/user/document?Verified=true')
            .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
    describe('updateUser', () => {
        it('should updateUser', async() => {
            const res = await request(app)
            .patch(`/api/user/update/${userOneId}`)
            .set('Authorization', `Bearer ${userOne.Tokens[0].token}`)
            .send({
                "Firstname": "manirabona"
            })
            expect(res.status).toBe(200)

            const userss = await User.findById(userOneId)
            expect(userss.Firstname).toEqual('manirabona')
        })
    })
    describe('deleteUser', () => {
        it('should delete user', async() => {
            const res = await request(app)
            .delete(`/api/user/remove/${userTwoId}`)
            .set('Authorization', `Bearer ${userTwo.Tokens[0].token}`)
            expect(res.status).toBe(200)
        })
    })
})
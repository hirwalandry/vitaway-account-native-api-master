const request = require('supertest')
const Category = require('../models/categories')
const app = require('../app')
const mongoose = require('mongoose')
const { userOne, category, databaseServer } = require('./userDb')


describe('categoryApi', () => {  
    beforeEach(databaseServer)
    describe('createCategory', () => {
        it('it should create category', async() => {
        const res = await request(app)
        .post('/api/category/create')
        .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
        .send({
            "Name" : "landry",
            "Active" : true
        })
        expect(res.status).toBe(201)

        const categories = await Category.findById(res.body._id)
        expect(categories).not.toBeNull()       
        })
    })
    describe('getCategory', () => {
        it('it should get all category', async() => {
        const res = await request(app)
        .get('/api/category/document')
        .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
        .send()
        expect(res.status).toBe(200)
       
        })
    })
    describe('deleteCategory', () => {
        it('it should delete category', async() => {
        const res = await request(app)
        .delete(`/api/category/remove`)
        .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
        expect(res.status).toBe(200)
       
        })
    })
    describe('updateCategory', () => {
        it('it should update category', async() => {
        const res = await request(app)
        .patch(`/api/category/update`)
        .set("Authorization", `Bearer ${userOne.Tokens[0].token}`)
        .send({
            "Name": "patient"
        })
        expect(res.status).toBe(200)
        expect(res.body.Name).toBe('patient')
       
        })
    })
})
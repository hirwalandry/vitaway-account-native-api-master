const asyncMiddleware = require('../middleware/asyncMiddleware')
const Category = require('../models/categories')

const createCategory = asyncMiddleware(async(req, res) => {

    const category = new Category(req.body)
    await category.save()
    res.status(201).send(category)
})
const getCategory = asyncMiddleware(async(req, res) => {

    const category = await Category.find()
    res.send(category)
})
const deleteCategory = asyncMiddleware(async(req, res) => {
    
    const category = await Category.deleteMany()
    res.send(category)
})
const updateCategory = asyncMiddleware(async(req, res) => {
    const updates = Object.keys(req.body)
    const category = await Category.findOne()

    updates.forEach((update) => category[update] = req.body[update])
    await category.save()
    res.send(category)
})

module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory
}
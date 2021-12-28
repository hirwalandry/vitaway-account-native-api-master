const asyncMiddleware = require('../middleware/asyncMiddleware')
const asynMiddleware = require('../middleware/asyncMiddleware')
const Message = require('../models/messages')

const createMessage = asyncMiddleware(async(req, res) => {

    const message = new Message(req.body)

    await message.save()
    res.status(201).send()
})
const readMessage = asyncMiddleware(async(req, res) => {

    const messages = await Message.find()
    res.send(messages)
})
const updateMessage = asyncMiddleware(async(req, res) => {
    
    const updates = Object.keys(req.body)

    const message = await Message.findById(req.params.id)
    updates.forEach(update => message[update] = req.body[update])
    await message.save()
    res.send(message)
})
const deleteMessages = asyncMiddleware(async(req, res) => {

    const message = await Message.deleteMany()
    res.send(message)
})
const deleteAmessage = asyncMiddleware(async(req, res) => {

    const message = await Message.findByIdAndDelete(req.params.id)
    if(!message){
        new Error('not found')
    }
    res.send(message)
})

module.exports = {
    createMessage,
    readMessage,
    updateMessage,
    deleteMessages,
    deleteAmessage
}
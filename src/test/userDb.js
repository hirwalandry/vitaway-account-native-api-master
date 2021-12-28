const config = require('config')
const User = require('../models/users')
const Category = require('../models/categories')
const Goal = require('../models/goals')
const Group = require('../models/groups')
const Member = require('../models/group_member')
const MedicalRec = require('../models/medical_rec') 
const Message = require('../models/messages')
const Specialist = require('../models/specialist')
const Notification = require('../models/notifications')
const Plan = require('../models/plan')
const VitalSign = require('../models/vital_sign')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')



userOneId = new mongoose.Types.ObjectId()
const userOne = {
    "_id": userOneId,
    "Firstname": "hirwa",
    "Lastname": "chriss",
    "Email": "hirwalandry77@gmail.com",
    "Password": "nshuti5784",
    "Verified": true,
    "VerificationCode": "438476",
    "Contact": "543857348957",
    "HealthySection": "am good in healthy",
    "Tokens": [{
        "token": jwt.sign({_id: userOneId, }, config.get("JWT_SECRET_TOKEN"))
    }] 

}
userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    "_id": userTwoId,
    "Firstname": "hirwa",
    "Lastname": "chriss",
    "Email": "nshutihirwa40@gmail.com",
    "Password": "nshuti5784",
    "Verified": true,
    "VerificationCode": "438476",
    "Contact": "543857348957",
    "HealthySection": "am good in healthy" ,
    "Tokens": [{
        "token": jwt.sign({_id: userTwoId}, config.get("JWT_SECRET_TOKEN"))
    }] 

}
const category = {
    "_id": new mongoose.Types.ObjectId(),
    "Name": "nshuti",
    "Active": true
}
const goal = {
    "_id": new mongoose.Types.ObjectId(),
    "Name": "nshuti",
    "Start": "monday",
    "End": "friday",
    "Owner": userOneId,
    "Active": true
}
const group = {
    "_id": new mongoose.Types.ObjectId(),
    "Name": "kanaka",
    "groupOwner": category._id,
    "Active": true
}
const group_member = {
    "_id": new mongoose.Types.ObjectId(),
    "groupName": group._id,
    "userOwner": userOneId,
    "Active": true
}
const medical_rec = {
    "_id": new mongoose.Types.ObjectId(),
    "Owner": userOneId
}
const message = {
    "_id": new mongoose.Types.ObjectId(),
    "Message": "you and me",
    "groupOwner": group._id,
    "userOwner": userOneId,
    "Active": true
}
const notification = {
    "_id": new mongoose.Types.ObjectId(),
    "Message": "hi dev",
    "Readed": true,
    "Owner": userOneId,
    "Active": true
}
const specialist = {
    "_id": new mongoose.Types.ObjectId(),
    "Name": "kiki",
    "Email": "manirabonapatient33@gmail.com",
    "Section": "two",
    "categoryOwner": category._id,
    "Active": true
}
const plan = {
    "_id": new mongoose.Types.ObjectId(),
    "Name": "lando",
    "Description": "create plan2",
    "Start": "tuesday",
    "End": "friday",
    "specialistOwner": specialist._id,
    "userOwner": userOne._id,
    "Active": true
}
const vital_sign = {
    "_id": new mongoose.Types.ObjectId(),
    "BMI": "a donno really",
    "Systolic": "a donno really",
    "Diastolic": "a donno really",
    "BloodGlucose": "a donno really",
    "Owner": userOneId,
    "Active": true
}
// before doing anything in database test do this:
const databaseServer = async() => {

    await User.deleteMany()
    await Category.deleteMany()
    await Goal.deleteMany()
    await Group.deleteMany()
    await Member.deleteMany()
    await MedicalRec.deleteMany()
    await Message.deleteMany()
    await Notification.deleteMany()
    await Specialist.deleteMany()
    await Plan.deleteMany()
    await VitalSign.deleteMany()

    await new User(userOne).save()
    await new User(userTwo).save()
    await new Category(category).save()
    await new Goal(goal).save()
    await new Group(group).save()
    await new Member(group_member).save()
    await new MedicalRec(medical_rec).save()
    await new Message(message).save()
    await new Notification(notification).save()
    await new Specialist(specialist).save()
    await new Plan(plan).save()
    await new VitalSign(vital_sign).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    category,
    goal,
    group,
    group_member,
    medical_rec,
    message,
    notification,
    specialist,
    plan,
    vital_sign,
    databaseServer
}
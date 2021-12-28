const asyncMiddleware = require('../middleware/asyncMiddleware')
const User = require('../models/users')

const createUser = asyncMiddleware(async(req, res) => {
    const user = new User(req.body)

    await user.save()
    const token = await user.generateAuthToken();
    res
      .status(201)
      .send({ Message: "Successfully saved!", error: false, user, token });  

})
const loginUser = asyncMiddleware(async(req, res) => {

    const user = await User.findByCredentials(req.body.Email, req.body.Password);
    const token = await user.generateAuthToken();
    res.send({ Message: "Login successed!", error: false, user, token });
})
const logoutUser = asyncMiddleware(async(req, res) => {
    req.user.Tokens = req.user.Tokens.filter(token => token.token !== req.user.token);
      await req.user.save();
      res.send({ Message: "User logged out!", error: false, user: req.user });
})
const getUser = asyncMiddleware(async(req, res) => {
    const user = await User.findById(req.params.id);
    res.send({ Message: "User Found in Records!", error: false, user });
})
const verifiedUser = asyncMiddleware(async(req, res) => {
    const match = {};
    if (req.query.Verified) {
      match.Verified = req.query.Verified === 'true';
    }

      const user = await User.find(match);
      res.send({ Message: "User found!", error: false, user });
})
const updateUser = asyncMiddleware(async(req, res) => {
    const validUpdates = [
        "Firstname",
        "Lastname",
        "Birthday",
        "Country",
        "City",
        "Contact",
        "HealthySection",
      ];
      const providedUpdates = Object.keys(req.body);
      const isValidOp = providedUpdates.every((update) => {
        validUpdates.includes(update);
      });
    
      if (isValidOp) {
        res.status(400).send({
          Message: "You're trying to update unlocated field",
          error: true,
        });
      }

        const user = await User.findByIdAndUpdate(req.params.id);
        providedUpdates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send({ Message: "User Updated!", error: false, user });
})
const deleteUser = asyncMiddleware(async(req, res) => {
    await req.user.remove();
    res.send({ Message: "Operation Done!", error: false });
})
module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUser,
    verifiedUser,
    updateUser,
    deleteUser
}
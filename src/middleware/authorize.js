const config = require('config')
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodeToken = jwt.verify(token, config.get("JWT_SECRET_TOKEN"));

    // get the user who has specified id and token
    const user = await User.findOne({
      _id: decodeToken._id,
      "Tokens.token": token,
    });

    // if user not found
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ Message: "Please authenticate!", error: true });
  }
};

module.exports = Auth;

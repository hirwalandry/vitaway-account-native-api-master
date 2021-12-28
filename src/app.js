process.env["NODE_CONFIG_DIR"] = __dirname + "/config/"
const {error_404, errors} = require('./middleware/error_handling')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

require("./database/mongodb");

// load routers
const Users = require("./routers/users");
const Categories = require("./routers/categories");
const goals = require("./routers/goals");
const group = require("./routers/groups")
const group_member = require("./routers/group_member")
const medical_rec = require("./routers/medical_rec");
const messages = require("./routers/messages");
const notifications = require("./routers/notifications");
const plan = require("./routers/plan");
const specialist = require("./routers/specialist");
const vital_sign = require("./routers/vital_sign");

// use routers
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use('/api/user', Users);
app.use('/api/category', Categories);
app.use('/api/goal', goals);
app.use('/api/group', group)
app.use('/api/group_member', group_member)
app.use('/api/medical_rec', medical_rec);
app.use('/api/message', messages);
app.use('/api/notification', notifications);
app.use('/api/plan', plan);
app.use('/api/specialist', specialist);
app.use('/api/vital_sign', vital_sign);
app.use(error_404)
app.use(errors)

module.exports = app;
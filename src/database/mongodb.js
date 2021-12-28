const config = require('config')
const mongoose = require("mongoose");


const connection = mongoose.connect(config.get("MONGODB"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
if (!connection) {
    console.log('connection failed')
    
}
console.log('connection successfull')
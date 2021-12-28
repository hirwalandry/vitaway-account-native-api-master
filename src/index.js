process.env["NODE_CONFIG_DIR"] = __dirname + "/config/"
const config = require('config')
const app = require('./app')

const PORT = config.get('PORT')
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
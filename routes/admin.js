const express = require(`express`)
const app = express()
// const auth = require('../auth/auth')
const adminController = require('../controllers/admin')

app.use(express.json())

app.post("/auth", adminController.login)
app.post("/", adminController.register)

module.exports = app
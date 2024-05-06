const express = require(`express`)
const app = express()
const auth = require('../auth/auth')
const orderController = require('../controllers/order')

app.post('/', orderController.order)
app.get('/', auth.authVerify, orderController.orderHistory)

module.exports = app
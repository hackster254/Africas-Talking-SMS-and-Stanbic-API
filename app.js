const express =  require("express")
const ussdRouter = require('./ussdRoutes')
const smsRouter = require('./inboundRoutes')
const app =  express()

app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit: "10kb"}))

app.use("/", ussdRouter)
app.use("/", smsRouter)

module.exports = app
const express = require("express")
const router = express.Router()

const smsController = require('./smsController')


router.route("/inbound").post(smsController.inbound, smsController.getNumber, smsController.stkPush)

module.exports = router
const express = require("express")
const router = express.Router()
const ussdController = require("./UssdController")

router.route("/ussd").post(ussdController.processUssd)

module.exports = router
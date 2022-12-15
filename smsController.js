const { default: axios } = require('axios')
const { json } = require('express')
const qs = require('qs')

const credentials = {
    username: process.env.AT_USERNAME,
    apiKey: process.env.AT_API_KEY
}

const AfricasTalking = require('africastalking')(credentials)
console.log(credentials)

exports.inbound = (req, res, next) => {
    next()
}

exports.getNumber = (req, res, next) => {
    const data = req.body
    const passangerPhoneNumber =  `254${parseInt(data.text.trim())}`
    console.log(passangerPhoneNumber)
    const token = generateAuth()
    req.body.token = token
    req.body.number = passangerPhoneNumber
    next()
}

const sendMessage = (msg, phonenumber) => {
    const options = {
        to: phonenumber,
        message: msg,
        from: process.env.SHORT_CODE
    }

    AfricasTalking.SMS.send(options).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

const generateAuth = async() => {
    const headers= {
        'Content-Type': 'application/json',
        "Accept-Encoding": "application/json"
    }

    
    const body = qs.stringify({
        "grant_type": "client_credentials",
        "scope": "payments",
        "client_id": process.env.STANBIC_CLIENT_ID,
        "client_secret": process.env.STANBIC_CLIENT_SECRET
    })

    return await axios.post("https://api.connect.stanbicbank.co.ke/api/sandbox/auth/oauth2/token",body, headers).then((res) => {
        return res.data.access_token
    })

    

}

exports.stkPush = async(req,res,next)=> {
    const token = await req.body.token
    const number = await req.body.number

    console.log("toekn: ", token)
    console.log("number: ", number)
 
    const data = JSON.stringify({
        'dbsReferenceId': "yruriror",
        "billAccountRef": "0100010598828",
        "amount": "10.00",
        "mobileNumber": number
    })
    const config ={
        method: 'POST',
        url: "https://api.connect.stanbicbank.co.ke/api/sandbox/mpesa-checkout",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    }

    axios(config).then((res) => {
        console.log(JSON.stringify(res.data))
    }).catch((err) => {
        console.log(err)
    })

}
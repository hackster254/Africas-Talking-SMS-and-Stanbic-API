require('dotenv').config()
const app =  require("./app")
const port= process.env.port || 3500

app.listen(port, () => {
    console.log(`App is running`)
})





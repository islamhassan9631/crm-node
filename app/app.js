const express = require("express")
const app = express()
const path= require("path")
const cors =require("cors")

require("../db/connect")
app.use("/upload",express.static(path.join(__dirname,"../upload")))
app.use(express.json())
app.use(cors())
const userRoutes = require("../routes/user.routes")
const clientRoutes = require("../routes/client.routes")
const BuildRoutes = require("../routes/Build.routes")
const urlRoutes = require("../routes/url.routes")
const trRoutes = require("../routes/tr.routes")
const passwordRoutes = require("../routes/password.routes")
app.use("/api/password",passwordRoutes)
app.use("/api/user",  userRoutes)
app.use("/api/Build", BuildRoutes)
app.use("/api/clinet", clientRoutes)
app.use("/api/url", urlRoutes)
app.use("/api/transaction", trRoutes)
app.all("*", (req, res)=> {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})
module.exports=app
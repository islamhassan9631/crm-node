const router = require("express").Router()
const { get } = require("mongoose")
const url = require('../app/controller/url.contoller')
const auth = require("../midel/auth")

const SuperAdmin= require("../midel/super admin")

router.route("/").post(SuperAdmin,url.addurl).get(auth,url.urls).delete(auth,url.delete)
router.route("/transaction/:id").patch(url.update)









module.exports = router
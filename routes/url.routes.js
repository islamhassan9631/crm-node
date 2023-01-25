const router = require("express").Router()
const { get } = require("mongoose")

const url = require('../app/controller/url.contoller')


const SuperAdmin= require("../midel/super admin")

router.route("/").post(url.addurl).get(url.urls).delete(SuperAdmin,url.delete)
router.route("/:id").patch(url.update)









module.exports = router
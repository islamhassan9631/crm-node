const router = require("express").Router()
const User = require('../app/controller/user.contoller')

const upload = require("../midel/upload")
const SuperAdmin= require("../midel/super admin")


router.route("/").post(User.register).get(SuperAdmin,User.users).delete(SuperAdmin,User.logout) 
router.route("/user").get(SuperAdmin,User.profile).post(SuperAdmin,upload.single('avatar'),User.updeteprofile).patch(SuperAdmin,User.updateprofile) 
router.route("/auth").post(User.login)
router.route("/user/:id").get(SuperAdmin,User.userId).patch(SuperAdmin,User.update).delete(SuperAdmin,User.delete)

 
 

module.exports = router
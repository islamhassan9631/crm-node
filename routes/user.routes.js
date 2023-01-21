const router = require("express").Router()
const User = require('../app/controller/user.contoller')
const auth = require("../midel/auth")

const SuperAdmin= require("../midel/super admin")

//  router.post("/register",User.register)
// router.post("/login",User.login)
// router.get("/users",auth,SuperAdmin,User.users)
// router.get("/users/:id",auth,SuperAdmin,User.userId)
// router.delete("/users/:id",auth,SuperAdmin,User.delete)
// router.patch("/users/:id",auth,SuperAdmin,User.update)
// router.get("/profile",auth,User.profile) 
// router.delete("/logout",auth,employee,User.logout)
// router.delete("/logoutAll",auth,SuperAdmin,User.logoutAll)


//  router.delete("/deleteAd/:id",auth,SuperAdmin,User.deleteAd)
router.route("/").post(User.register).get(SuperAdmin,User.users).delete(SuperAdmin,User.logout) 
router.route("/user").get(SuperAdmin,User.profile)
router.route("/auth").post(User.login)
router.route("/user/:id").get(SuperAdmin,User.userId).patch(auth,SuperAdmin,User.update).delete(SuperAdmin,User.delete) 

 
 

module.exports = router
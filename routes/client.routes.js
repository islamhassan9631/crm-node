const router = require("express").Router()
const client = require("../app/controller/client.contoller")

const upload = require("../midel/upload")
const auth = require("../midel/auth")

const SuperAdmin= require("../midel/super admin")


router.route("/clinet").post(SuperAdmin,client.add).get(SuperAdmin,client.clients).delete(client.logout)
router.route("/auth").post(client.login).get(auth,client.profile)
router.route("/data").get(auth,client.getData)
router.route("/client/:id").get(SuperAdmin,client.clientId).patch(client.update).delete(SuperAdmin,client.delete).post(auth,upload.single('avatar'),client.updeteprofile)



 
 

module.exports = router
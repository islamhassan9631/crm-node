const router = require("express").Router()
const client = require("../app/controller/client.contoller")

const auth = require("../midel/auth")

const SuperAdmin= require("../midel/super admin")


router.route("/clinet").post(SuperAdmin,client.add).get(SuperAdmin,client.clients).delete(auth,client.logout)
router.route("/client/:id").get(SuperAdmin,client.clientId).patch(client.update).delete(SuperAdmin,client.delete)



 
 

module.exports = router
const router = require("express").Router()
const client = require("../app/controller/client.contoller")

const upload = require("../midel/upload")
const auth = require("../midel/auth")

const SuperAdmin= require("../midel/super admin")


router.route("/clinet").post(SuperAdmin,client.add).get(SuperAdmin,client.clients).delete(client.logout)
router.route("/auth").post(client.login)
router.route('/client/').get(auth,client.profile).patch(auth,client.editprofile).post(auth,upload.single('avatar'),client.updeteprofile)

router.route("/data").get(auth,client.getData)
router.route("/client/:id").get(SuperAdmin,client.clientId).patch(client.update).delete(SuperAdmin,client.delete)


 
 

module.exports = router
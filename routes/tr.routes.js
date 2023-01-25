const router = require("express").Router()
const transaction = require('../app/controller/transaction.controller')
const  auth  = require("../midel/auth")

const SuperAdmin= require("../midel/super admin")
router.route("/transaction").post(SuperAdmin, transaction.addtransaction).get(SuperAdmin,transaction.gettransction)
router.route("/transaction/:id").get(SuperAdmin,transaction.transctionId).patch(transaction.update).delete(SuperAdmin,transaction.delete)

module.exports = router
const router = require("express").Router({mergeParams: true})
const Build = require('../app/controller/Build.controller')
const  auth  = require("../midel/auth")

const SuperAdmin= require("../midel/super admin")

router.route("/build").post(Build.addBuild).get(Build.AllBuild).delete(Build.deleteAll)
router.route("/build/:id").get(Build.build).delete( Build.delete)
router.route("/project/:projectid/build/:id").get(Build.getbuilding)
router.route("/project/:projectId/buildings/:buildingId/building/:buildId").patch(Build.edit).get( Build.build).post(Build.addflor)
router.route("/test").get(auth,Build.myunit)
module.exports = router

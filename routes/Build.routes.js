const router = require("express").Router({mergeParams: true})
const Build = require('../app/controller/Build.controller')
const  auth  = require("../midel/auth")
const upload = require("../midel/upload")
const uploadMixOfImages= require("../midel/uploadmax")
const SuperAdmin= require("../midel/super admin")

router.route("/build").post(Build.addproject).get(Build.AllBuild).delete(Build.deleteAll)
router.route("/build/:id").get(Build.projct).delete( Build.delete).patch(Build.edit)
router.route("/project/:projectid/build/:id").get(Build.getbuilding).post(Build.addbuild)
router.route("/project/:projectid/buildings/:buildingid/build/:buildid/floors/:floorId").get(Build.getflor).post(Build.addunit).delete(Build.deletefloor).patch(Build.updateflor)
router.route("/project/:projectid/buildings/:buildingid/build/:buildid/floors/:floorid/units/:unitid").get(Build.getunit).delete(Build.deletunit).patch(Build.updateunit).post(upload.array("avtar",2),Build.addimgunit)
router.route("/project/:projectid/buildings/:buildingid/build/:buildid").patch(Build.updatebuild).get( Build.getbuild).post(Build.addflor).delete(Build.deletesenglebulid)
router.route("/test").get(auth,Build.myunit)

module.exports = router

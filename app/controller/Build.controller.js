const Buildd = require("../../db/models/Build.model")
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const Myhelper = require("../helper")
class Build {
    //// add project
    static addproject = async (req, res) => {
        try {
            const BuildData =  await Buildd.create(
               { ...req.body,building:[{
                build:[{
                    floors:[{
                        units:[]
                    }]
                }]
               }]}
            )
            // await BuildData.save()
            Myhelper.reshandlar(res, 200, true, BuildData, "added")

        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    }
    ///// get myunit
    static myunit = async (req, res) => {
        try {

            await req.clinet.populate({path:"myunit",select:'price'}),
            Myhelper.reshandlar(res, 200, true, 
              req.clinet
         , "added")
           
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    }
    //////get alll projects
    static AllBuild = (async (req, res) => {

        try {
            let build = await Buildd.find()



            Myhelper.reshandlar(res, 200, true, {
                build
            }, "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e)

        }

    })
    //////////// get single project
    static projct = (async (req, res) => {
        const _id = req.params.id
        try {
            const build = await Buildd.findOne({ _id })


            if (!build) throw new Error("not found")

            Myhelper.reshandlar(res, 200, true, {
                build,

            }, "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })

////////////update project
    static edit = (async (req, res) => {
        const update=Object.keys(req.body)
        try {
            const _id = req.params.id
            const build = await Buildd.findByIdAndUpdate(req.params.id, req.body, {

                new: true,
                runValidators: true
            })
            update.forEach((el)=>(build[el]=req.body[el]))
            await build.save()


            Myhelper.reshandlar(res, 200, true, {
                build

            }, "edit")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    })
    //// delete project by id
    static delete = (async (req, res) => {
        try {
            const build = await Buildd.findByIdAndDelete(req.params.id)


            Myhelper.reshandlar(res, 200, true,


                "delete")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    })
    ///// delet all projects
    static deleteAll = (async (req, res) => {
        try {
            await Buildd.deleteMany()



            Myhelper.reshandlar(res, 200, true, {


            }, "deleteAll")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    })
    //////get building
    static getbuilding = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            console.log(req.params);
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 

            if (!project) throw new Error("not found projct");
            console.log(project)
            const building = project.building.find(building => building._id == req.params.id);
            if (!building) throw new Error("not found building");


            await project.save();

            Myhelper.reshandlar(res, 200, true, {
                building,

            }, "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
//////addd floor
    static addflor = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found");
            console.log(project)
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found");
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found");
            build.floors.push({...req.body})

            await project.save();

            Myhelper.reshandlar(res, 200, true, {
                floors: build.floors,

            }, "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    /////get floor
    static getflor = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
            console.log(project)
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found building");
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found build");
            console.log(req.params.floorId);
            const floor = build.floors.find(floor => floor._id == req.params.floorId)
            console.log(floor);


            await project.save();

            Myhelper.reshandlar(res, 200, true,
                floor

                , "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    //////deletefloor
    static deletefloor = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
            console.log(project)
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found building");
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found build");
            console.log(req.params.floorId);
            const floor = build.floors.find(floor => floor._id == req.params.floorId)
            console.log(floor);
            build.floors= build.floors.filter(floor=> floor._id != req.params.floorId);

            await project.save();

            Myhelper.reshandlar(res, 200, true,
                floor

                , "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    ////////update floor
    static updateflor = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
           
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found building");
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found build");
            console.log(req.params.floorId);
            const floor = build.floors.findIndex(floor => floor._id == req.params.floorId)
          console.log(floor);
            
          
            let oldfloor = build.floors[floor];
            console.log(oldfloor);
          let newfloor = {...oldfloor._doc,...req.body}
        
         
         console.log(newfloor);
           
           
             
              
         build.floors=newfloor

            await project.save();

            Myhelper.reshandlar(res, 200, true,
                newfloor

                , "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    ////addd build
    static addbuild = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
            console.log(project)
            const building = project.building.find(building => building._id == req.params.id);
            if (!building) throw new Error("not found building");
            console.log(building + "ggg");
            const build = building.build.push({
                floors: [{}]
                , ...req.body
            })
            console.log(build);

            await project.save();

            Myhelper.reshandlar(res, 200, true, {
                build,

            }, "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    ///////// get single build
    static getbuild = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found");
            console.log(project)
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found");
            const build = building.build.find(build => build._id == req.params.buildid)
            //    const build=building.build.find(build=>build._id==req.params.buildId);
            if (!build) throw new Error("not found");
            //    build.floors.push(req.body)

            await project.save();

            Myhelper.reshandlar(res, 200, true, {
                build

            }, "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    //////////delete single bulid
    static deletesenglebulid = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found");
            
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found");
            const build = building.build.find(build => build._id == req.params.buildid)

            if (!build) throw new Error("not found build");
            building.build= building.build.filter(build=> build._id != req.params.buildid);

            await project.save();

            Myhelper.reshandlar(res, 200, true, {
               

            }, "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    //////////update single bulid
    static updatebuild = (async (req, res) => {
        const _id = req.params.id
        const update=Object.keys(req.body)
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
         
            const building = project.building.find(building => building._id == req.params.buildingid);
            console.log(building);
          
           const x= building.build.findIndex(build => build._id == req.params.buildid)
           console.log(x);
           console.log( building.build[x]);
           let oldbuild = building.build[x];
           console.log(oldbuild)
         let newbuild = {...oldbuild._doc,...req.body}
        //  update.forEach((el)=>(oldbuild[el]=req.body[el]))
        
        
          console.log(newbuild);
          
            
             
          building.build[x]=newbuild

            await project.save();

            Myhelper.reshandlar(res, 200, true,
                newbuild,

           "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    //// addd unit
    static addunit = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");

            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found building");
           
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found build");
          
            const floor = build.floors.find(floors => floors._id == req.params.floorId);
          
            if (!floor) throw new Error("not found floor");
            console.log(req.body);
            floor.units.push(req.body)
        

            await project.save();

            Myhelper.reshandlar(res, 200, true,
                floor,
                "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    ///// get unit
    static getunit = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
            console.log(project)
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found building");
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found build");
            console.log(req.params.floorId);
            const floor = build.floors.find(floor => floor._id == req.params.floorid)
            console.log(floor);
            const unit = floor.units.find(unit => unit._id == req.params.unitid)
            //// unit.image.push(req.file.filename);
            console.log(unit);


          

            Myhelper.reshandlar(res, 200, true,
                unit

                , "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    ////deletunit
    static deletunit = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
            
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found building");
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found build");
            console.log(req.params.floorId);
            const floor = build.floors.find(floor => floor._id == req.params.floorid)
           
            const unit = floor.units.find(unit => unit._id == req.params.unitid)
        
            floor.units= floor.units.filter(unit=> unit._id != req.params.unitid);

          console.log(unit);
          await project.save();
            Myhelper.reshandlar(res, 200, true,
                unit

                , "deletunit")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
   
   /////////// update unit
    static updateunit = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
            
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found building");
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found build");
           
            const floor = build.floors.find(floor => floor._id == req.params.floorid)
            console.log(floor);
            const unit = floor.units.findIndex(unit => unit._id == req.params.unitid)
      
            let oldunit = floor.units[unit];
            
          let newunit = {...oldunit._doc,...req.body}
        
         
         
           
           
             
              
          floor.units[unit]=newunit


          
await project.save()
            Myhelper.reshandlar(res, 200, true,
                newunit

                , "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    static addimgunit = (async (req, res) => {
        const _id = req.params.id
        try {
            //get project by  name or id 
            const project = await Buildd.findById(req.params.projectid);
            //get building from prject buildings 
            if (!project) throw new Error("not found project");
            console.log(project)
            const building = project.building.find(building => building._id == req.params.buildingid);
            if (!building) throw new Error("not found building");
            const build = building.build.find(build => build._id == req.params.buildid);
            if (!build) throw new Error("not found build");
            console.log(req.params.floorId);
            const floor = build.floors.find(floor => floor._id == req.params.floorid)
            console.log(floor);
            const unit = floor.units.find(unit => unit._id == req.params.unitid)
            unit.image=req.files.images;
            console.log(req.files.images);
           
            
           


          
await project.save()
            Myhelper.reshandlar(res, 200, true,
                unit

                , "added")
        }
        catch (e) {
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })

}
module.exports = Build
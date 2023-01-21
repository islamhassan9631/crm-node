const Buildd = require("../../db/models/Build.model")
const Myhelper=require("../helper")
class Build{
    static addBuild = async(req,res)=>{
        try{
            const BuildData = new Buildd({
              
                ...req.body
            })
            await BuildData.save()
            Myhelper.reshandlar(res, 200, true, BuildData, "added")

        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    }
    static myunit = async(req,res)=>{
        try{ 
            
            await req.Clinet.populate("myunit")
            Myhelper.reshandlar(res, 200, true, {
                unit: req.Clinet.myunit,
                clinet: req.Clinet,
            }, "added")
}
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    }
    static AllBuild=( async (req, res) => {
        
        try {
           let build = await Buildd.find()
        
             
            
            Myhelper.reshandlar(res, 200, true, {
                build
            }, "added")
        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e)

        }

    })
    static  build=( async (req, res) => {
        const _id = req.params.id
        try {
            const build = await Buildd.findOne({ _id })
           
           
                if(!build) throw new Error("not found")
            
            Myhelper.reshandlar(res, 200, true, {
                build,
              
            }, "added")
        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    
    
    static edit=( async (req, res) => {
        try {
            const _id = req.params.id
            const build = await Buildd.findOneAndUpdate({_id,userId: req.user._id },req.body, {
        
                new: true,
                runValidators: true
            })
    
            
             
                Myhelper.reshandlar(res, 200, true, {
                    build
                    
                }, "edit")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
    static delete =( async (req, res) => {
        try {
            const build = await Buildd.findByIdAndDelete(req.params.id)
           
             
                Myhelper.reshandlar(res, 200, true, 
              
                    
                 "delete")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
    static deleteAll =( async (req, res) => {
        try {
           await Buildd.deleteMany()
        
          
              
                Myhelper.reshandlar(res, 200, true, {
          
                    
                }, "deleteAll")
    }
            catch(e){
                Myhelper.reshandlar(res, 500, false, e, e.message)
    
            }
    })
    static  getbuilding=( async (req, res) => {
        const _id = req.params.id
       try {
           //get project by  name or id 
           console.log(req.params);
           const project =await Buildd.findById(req.params.projectid);
           //get building from prject buildings 
        
           if(!project) throw new Error("not found projct");
           console.log(project)
           const building=project.building.find(building=>building._id==req.params.id);
           if(!building) throw new Error("not found building");
          
          
         await project.save();
           
           Myhelper.reshandlar(res, 200, true, {
               building,
             
           }, "added")
       }
       catch(e){
           Myhelper.reshandlar(res, 500, false, e, e.message)
    
       }
    
    })
    
    static  addflor=( async (req, res) => {
         const _id = req.params.id
        try {
            //get project by  name or id 
            const project =await Buildd.findById(req.params.projectId);
            //get building from prject buildings 
            if(!project) throw new Error("not found");
            console.log(project)
            const building=project.building.find(building=>building._id==req.params.buildingId);
            if(!building) throw new Error("not found");
            const build=building.build.find(build=>build._id==req.params.buildId);
            if(!build) throw new Error("not found");
            build.floors.push(req.body)
           
		  await project.save();
            
            Myhelper.reshandlar(res, 200, true, {
                floors:build.floors,
              
            }, "added")
        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    })
    static  getflor=( async (req, res) => {
        const _id = req.params.id
       try {
           //get project by  name or id 
           const project =await Buildd.findById(req.params.projectId);
           //get building from prject buildings 
           if(!project) throw new Error("not found");
           console.log(project)
           const building=project.building.find(building=>building._id==req.params.buildingId);
           if(!building) throw new Error("not found");
           const build=building.build.find(build=>build._id==req.params.buildId);
           if(!build) throw new Error("not found");
           build.floors.find(florr=>floors._id==req.params.floorsId)
          
         await project.save();
           
           Myhelper.reshandlar(res, 200, true, {
               floors:build.floors,
             
           }, "added")
       }
       catch(e){
           Myhelper.reshandlar(res, 500, false, e, e.message)

       }

   })
    static  addbuild=( async (req, res) => {
        const _id = req.params.id
       try {
           //get project by  name or id 
           const project =await Buildd.findById(req.params.projectId);
           //get building from prject buildings 
           if(!project) throw new Error("not found");
           console.log(project)
           const building=project.building.find(building=>building._id==req.params.buildingId);
           if(!building) throw new Error("not found");
           building.build.push(req.body)
        //    const build=building.build.find(build=>build._id==req.params.buildId);
        //    if(!build) throw new Error("not found");
        //    build.floors.push(req.body)
          
         await project.save();
           
           Myhelper.reshandlar(res, 200, true, {
               floors:build.floors,
             
           }, "added")
       }
       catch(e){
           Myhelper.reshandlar(res, 500, false, e, e.message)

       }

   })
   static  getbuild=( async (req, res) => {
    const _id = req.params.id
   try {
       //get project by  name or id 
       const project =await Buildd.findById(req.params.projectId);
       //get building from prject buildings 
       if(!project) throw new Error("not found");
       console.log(project)
       const building=project.building.find(building=>building._id==req.params.buildingId);
       if(!building) throw new Error("not found");
       building.build.find(build=>build._id==req.params.buildgId)
    //    const build=building.build.find(build=>build._id==req.params.buildId);
       if(!build) throw new Error("not found");
    //    build.floors.push(req.body)
      
     await project.save();
       
       Myhelper.reshandlar(res, 200, true, {
           building:build.build,
         
       }, "added")
   }
   catch(e){
       Myhelper.reshandlar(res, 500, false, e, e.message)

   }

})
   static  addunit=( async (req, res) => {
    const _id = req.params.id
   try {
       //get project by  name or id 
       const project =await Buildd.findById(req.params.projectId);
       //get building from prject buildings 
       if(!project) throw new Error("not found");
       console.log(project)
       const building=project.building.find(building=>building._id==req.params.buildingId);
       if(!building) throw new Error("not found");
       building.build.push(req.body)
       const build=building.build.find(build=>build._id==req.params.buildId);
       if(!build) throw new Error("not found");
       const floors=build.floors.find(floor=>floors._id==req.params.floorsId);
       if(!floors) throw new Error("not found");
       floors.units.push(req.body)
      
     await project.save();
       
       Myhelper.reshandlar(res, 200, true, {
           floors:build.floors,
         
       }, "added")
   }
   catch(e){
       Myhelper.reshandlar(res, 500, false, e, e.message)

   }

})
   
    
}
module.exports = Build
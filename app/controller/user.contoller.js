const userModel = require("../../db/models/user.model")
const Myhelper=require("../helper")
const fs = require("fs")


class User{
    static register= async(req,res)=>{
        try{
            const userData=new userModel(req.body)
            await userData.save()
            const token=await userData.genratToken()
            return Myhelper.reshandlar(
                res,200,true,{userData:userData,token},"done"
            )
        }catch(e){
        return Myhelper.reshandlar( res,500,false,e,e)
    }
    }



    
    static login=async(req,res)=>{
        try{
            const user= await userModel.login(req.body.email,req.body.password)
           
            const token=await user.genratToken()
              await user.save()
            return Myhelper.reshandlar(
                res,200,true,{user:user,token},"done"
            )
        }catch(e){
        return Myhelper.reshandlar( res,500,false,e,e.message)
    }
    }
    static profile= async(req,res)=>{
          try{
            Myhelper.reshandlar(
                res,200,true,req.user
            )
          }catch(e){
  Myhelper.reshandlar( res,500,false)
          }
           
        
         
        
    }
    static users= async(req,res)=>{
        try{
            console.log("a");
            const users=await userModel.find({})
             Myhelper.reshandlar(res,200,true,users,"done")
    }catch(e){
        return Myhelper.reshandlar(res,500,false,"super admin only can do it",e.message)
    }

}



static userId=async(req,res)=>{
    try{
        const user=await userModel.findById(req.params.id)
        if(!user){return res.status(404).send("User not found")}
        return Myhelper.reshandlar(res,200,true,user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e)}
}
static update=async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const user=await userModel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(user[el]=req.body[el]))
        await user.save()
        
        if(!user){return res.status(404).send("User not found")}
        return Myhelper.reshandlar(res,200,true,user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static delete=async(req,res)=>{
    try{
        const user=await userModel.findByIdAndDelete(req.params.id)
        if(!user){return res.status(404).send("User not found")}
        return Myhelper.reshandlar(res,200,true,user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e)}
}
static logout= async(req,res)=>{
    try{
 req.user.tokens=req.user.tokens.filter((el)=>{
    return el.token!= req.token
}) 

await req.user.save()
return Myhelper.reshandlar(res,200,true,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}


static logoutAll= async(req,res)=>{
    try{
 req.user.tokens=[]
 await req.user.save()



return Myhelper.reshandlar(res,200,true,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}

}




static deleteAd=async(req,res)=>{
    try{
    
        req.user.addresses=req.user.addresses.filter(adress=>adress.id!= req.params.id);
        req.user.save();
        return Myhelper.reshandlar(res,200,true,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}


static updeteprofile=async(req,res)=>{
    try{
       
    // const est=req.file.originalname.split(".").pop()
    // const newn=`upload/user/`+ Date.now() +est

    // fs.renameSync(req.file.path,newn)
    req.user.image=req.file.filename;
        
    await req.user.save()
    return Myhelper.reshandlar(res,200,true,req.user,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}

 
}


module.exports = User
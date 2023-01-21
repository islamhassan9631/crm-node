const jwt=require("jsonwebtoken")
const User=require("../db/models/user.model")
const Clinet=require("../db/models/client")

  const auth=async(req,res,next)=>{
    
    try{
const token=req.header("Authorization").replace("Bearer ","")
const decode=jwt.verify(token,"node")
//  const user=await User.findOne({_id: decode._id,
//     "tokens:token":token})
     const clinet=await Clinet.findOne({_id: decode._id,
         "tokens:token":token})
    

 if(!clinet){
    throw new Error("User not found")
}




    
   req.Clinet=clinet
    req.token=token
    
next()
    }
    catch(e){
        console.log(e.message)
    }
}

 
module.exports=auth
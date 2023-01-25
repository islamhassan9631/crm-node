const jwt=require("jsonwebtoken")
const urlModel=require("../db/models/url.model")
const User=require("../db/models/user.model")

// const isSuperAdmin=async(req, res, next)=>{
// 	try{
// 		 const user=await User.findOne({
// 	user_permissions :"super admin"})
// 	 if(!user_permissions === "super admin"){
// 		throw new Error("User not found")
// 	 }
// 	 req.user=user
// 	next()
// 	}catch(e){ }
	
// 	// if(req.user.user_permissions === "super admin"){
// 	// 	return next();
// 	// } 
	
// }
const isSuperAdmin= async(req,res,next)=>{
	try{

	
	 
		const url=req.baseUrl.split("/")[2]
		const method=req.method.toLowerCase();
		 console.log(method);
		 const params=req.params
	
		
		const dburl=await urlModel.findOne({link:"/"+url})
		const token=req.header("Authorization").replace("Bearer ","")
const decode=jwt.verify(token,"node")
 const user=await User.findOne({_id: decode._id,
    "tokens:token":token})
	req.user=user
	req.token=token
	
		console.log(dburl);

		const roles=dburl.roles
		roles.forEach(r => {
		
			
			if(!req.user.roles==r){
		
			 throw  new Error("you can not change")
			}
		});
		
		const dbmethod=await urlModel.findOne({"methods":method});
		console.log(dbmethod);
		console.log(dbmethod.methods);
		console.log(req.user.methods);
		if(req.user.methods.includes(method))	return  next()

		res.send({massage:"you can not changeh"})
		
	
	}catch(e){
		res.send({massage:"you can not changeh"})
	}
}
	


module.exports = isSuperAdmin

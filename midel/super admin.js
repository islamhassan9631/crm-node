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
	 
		const url=req.baseUrl.split("/")[2]
		const method=req.method.toLowerCase();
		 console.log(method);
		 const params=req.params
		//  console.log(params);
		
		const dburl=await urlModel.findOne({link:"/"+url})
		const token=req.header("Authorization").replace("Bearer ","")
const decode=jwt.verify(token,"node")
 const user=await User.findOne({_id: decode._id,
    "tokens:token":token})
	req.user=user
	req.token=token
	// console.log(user);
		console.log(dburl);

		const roles=dburl.roles
		roles.forEach(r => {
		
			// throw  new Error("you can not change")
			if(!req.user.roles==r){
			// return	 req.roles=roles
			 throw  new Error("you can not change")
			}
		});
		// console.log(req.roles);
		// res.send({
		// 	massage:"you can not change"
		// })
		const dbmethod=await urlModel.findOne({"methods":method});
		console.log(dbmethod);
		console.log(dbmethod.methods);
		console.log(req.user.methods);
		if(req.user.methods.includes(method))	return  next()

		res.send({massage:"you can not changeh"})
		
		// const methods=dbmethod.methods
		// if(dbmethod.inCludes(methods)){
		// 	 throw new Error("you can not change")
			
		// }
	
		// console.log(methods);
		// methods.forEach(m => {
		// 	if(!req.user.methods==m){
		// 		throw new Error("you no")
		// 	}
    // })
	
	// res.send({
	// 	massage:"you change"
	// })
	// next()
}
	


module.exports = isSuperAdmin

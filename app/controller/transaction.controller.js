const TransactionModel = require("../../db/models/transactions.JS")
const clinet=require("../../db/models/client")
const Build=require("../../db/models/Build.model")
const Myhelper=require("../helper")
const moment = require("moment");

class Transaction{
    static addtransaction = async(req,res)=>{
        try{
           const transaction = new  TransactionModel({
            deposited_by_user:req.user._id,
            ...req.body})   ;

		
        await transaction.save();
        const client=await clinet.findOne({_id:req.body.client});

        client.transactions.push(transaction._id);
        client.save()
        console.log(client);
           
        //  const bulid = await Build.findOne({_id:req.body.unit});
        //  console.log(bulid);
		//  await bulid.transactions.push(transaction._id);
		//  await bulid.save();
        //       console.log(bulid);
         
          
            Myhelper.reshandlar(res, 200, true, {transaction}, "added")

        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)
            console.log(e.message);

        }
    }
    

    static gettransction= async(req,res)=>{
        try{
            const transction=await TransactionModel.find({})
            return Myhelper.reshandlar(res,200,true,transction,"done")
    }catch(e){
        return Myhelper.reshandlar(res,500,false,e,e)
    }

}
static transctionId=async(req,res)=>{
    try{
        const transction=await TransactionModel.findById(req.params.id)
        if(!transction){return res.status(404).send("transction not found")}
        return Myhelper.reshandlar(res,200,true,transction,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e)}
}
static update=async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const transction=await TransactionModel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(transction[el]=req.body[el]))
        await transction.save()
        
        if(!transction){return res.status(404).send("transction not found")}
        return Myhelper.reshandlar(res,200,true,transction,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e)}
}
static delete=async(req,res)=>{
    try{
        const transction=await TransactionModel.findByIdAndDelete(req.params.id)
        if(!transction){return res.status(404).send("transction not found")}
        return Myhelper.reshandlar(res,200,true,transction,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e)}
}
}
module.exports=Transaction
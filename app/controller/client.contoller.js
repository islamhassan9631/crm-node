const clientModel = require("../../db/models/client")
const Myhelper=require("../helper")
const PDFDocument = require('pdfkit')
const path=require('path')
const fs = require('fs');

class client{
    static add= async(req,res)=>{
        
        try{
            const clientData=new clientModel({
                created_by:req.user._id
                ,...req.body})
            await clientData.save()
            const token=await clientData.genratToken()
            return Myhelper.reshandlar(
                res,200,true,{clientData:clientData,token},"done"
            )
        }catch(e){
        return Myhelper.reshandlar( res,500,false,e,e.message)
    }}
    static login=async(req,res)=>{
        try{
            const client= await clientModel.login(req.body.email,req.body.password)
           
            const token=await client.genratToken()
              await client.save()
              console.log(client);
            return Myhelper.reshandlar(
                res,200,true,{client:client,token},"done"
            )
        }catch(e){
        return Myhelper.reshandlar( res,500,false,e.message)
    }
    }
    static profile= async(req,res)=>{
          try{
            Myhelper.reshandlar(
                res,200,true,req.clinet,
            )
          }catch(e){
  Myhelper.reshandlar( res,500,false,e,e.message)
          }
           
        
         
        
    }
    static clients= async(req,res)=>{
        try{
            const clients=await clientModel.find({})
            return Myhelper.reshandlar(res,200,true,clients,"done")
    }catch(e){
        return Myhelper.reshandlar(res,500,false,e,e.message)
    }

}



static clientId=async(req,res)=>{
    try{
        const client=await clientModel.findById(req.params.id)
        if(!client){return res.status(404).send("client not found")}
        return Myhelper.reshandlar(res,200,true,client,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e)}
}
static update=async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const client=await clientModel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(client[el]=req.body[el]))
        await client.save()
        
        if(!client){return res.status(404).send("client not found")}
        return Myhelper.reshandlar(res,200,true,client,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static delete=async(req,res)=>{
    try{
        const client=await clientModel.findByIdAndDelete(req.params.id)
        if(!client){return res.status(404).send("client not found")}
        return Myhelper.reshandlar(res,200,true,client,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static logout= async(req,res)=>{
    try{
 req.clinet.tokens=req.clinet.tokens.filter((el)=>{
    return el.token!= req.token
}) 

await req.clinet.save()
return Myhelper.reshandlar(res,200,true,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}


static logoutAll= async(req,res)=>{
    try{
 req.client.tokens=[]
 await req.client.save()



return Myhelper.reshandlar(res,200,true,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}

}
static getData= async(req,res)=>{
    await req.clinet.populate({path:"transactions",select:"transaction_info -_id"});
    await req.clinet.populate({path:"created_by",select:"fName lName "});
    console.log(req.clinet.transactions);
    const clientResponseObject={employee:{...req.clinet.created_by._doc},transactions:req.clinet.transactions,clinet:{fName:req.clinet._doc.fName,lname:req.clinet._doc.lName}}
    res.json(clientResponseObject)
    // console.log(req.client.transactions[0].transaction_info)
     const doc = new PDFDocument();

    
     doc.pipe(fs.createWriteStream('client1.pdf'));
   
     doc
      
     .fontSize(25)
    .text(JSON.stringify(clientResponseObject), 100, 100);
    
     doc.end();
     res.sendFile(path.join(__dirname, '../../client1.pdf'))
}
static updeteprofile=async(req,res)=>{
    try{
       
    
   req.clinet.image=req.file.filename;
        
    await  req.clinet.save()
    return Myhelper.reshandlar(res,200,true,req.clinet,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
}

module.exports = client
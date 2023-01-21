const Urlmodel = require("../../db/models/url.model")
const Myhelper=require("../helper")
class url{
    static addurl = async(req,res)=>{
        try{
            const urlData = new Urlmodel({
              
                ...req.body
            })
            await urlData.save()
            Myhelper.reshandlar(res, 200, true, urlData, "added")

        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    }
    static urls= async(req,res)=>{
        try{
            console.log("a");
            const urls=await Urlmodel.find({})
             Myhelper.reshandlar(res,200,true,urls,"done")
    }catch(e){
        return Myhelper.reshandlar(res,500,false,"super admin only can do it",e.message)
    }

}
static urlId=async(req,res)=>{
    try{
        const url=await Urlmodel.findById(req.params.id)
        if(!url){return res.status(404).send()}
        return Myhelper.reshandlar(res,200,true,url,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static update=async(req,res)=>{
    const update=Object.keys(req.body)
    try{
        const url=await Urlmodel.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators:true
        })
        update.forEach((el)=>(url[el]=req.body[el]))
        await url.save()
        
        if(!url){return res.status(404).send()}
        return Myhelper.reshandlar(res,200,true,url,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
static delete=async(req,res)=>{
    try{
        const url=await Urlmodel.findByIdAndDelete(req.params.id)
        if(!url){return res.status(404).send()}
        return Myhelper.reshandlar(res,200,true,url,"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}

}
    module.exports=url
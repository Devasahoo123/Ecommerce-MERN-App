import userModel from "../../models/userModel.js";
const updateUser =async(req,res)=>{
    try{
        const {sessionUser} = req.userId;
        const {userId,email,name,role} = req.body;

        const payload ={
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role})
        }
        const user = await userModel.findById(sessionUser);


        
        const updateUser = await userModel.findByIdAndUpdate(userId,payload,{new : true});

        res.json({
            message : "User updated successfully",
            data : updateUser,
            error : false,
            success : true
        })
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
export default updateUser;
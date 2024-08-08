import UserModel from "../../models/userModel.js";
const allUser=async(req,res)=>{
    try{
        // console.log("userid all user",req.userId);

        const allUsers= await UserModel.find();
        res.json({
            message : "all user",
            error : false,
            success : true,
            data : allUsers
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
export default allUser;
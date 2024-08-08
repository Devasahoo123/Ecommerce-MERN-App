import jwt from "jsonwebtoken";
const authThoken=async (req,res,next)=>{
    try{
        const token=req.cookies?.token
        if(!token){
            return res.status(200).json({
                error:true,
                message:'token not found',
                success : false,
                data:[]
            })
        }
        const verified = jwt.verify(token,process.env.TOCKEN_SECRET_KEY)
        if (verified?.id) {
            req.userId = verified?.id;
        } else {
            console.log("auth err", err);
        }
       
        next();
    }catch(e){
        res.status(400).json({
            error:true,
            message: e.message ||e,
            success : false,
            data:[]

        })
    }
}

export default authThoken;
const db = require('../models')

module.exports={
    async signUpValidator(req,res,next){
        try {
            const data = await db.user.findOne({
                where:{
                    email:res.locals.validatedInput.email
                },
                raw:true,
                attributes:['email']
            }).catch(e=>{throw new Error(e)})
            if(data) throw {code:409,message:'Email already registered'}
            next()
        } catch (error) {
            return res.status(error.code?error.code:500).send({msg:error.message})
        }
    }
}
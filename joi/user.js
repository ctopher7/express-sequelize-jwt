const Joi = require('@hapi/joi');

const schemaSignUp=Joi.object({
    name:Joi.string().min(3).max(30).required(),
    password:Joi.string().regex(/^(?=.{6,30})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=/\-|\\{}\[\]\:\;\"\',.<>?`~]).*$/).required(),
    confirmPassword:Joi.ref('password'),
    email:Joi.string().email({ minDomainSegments: 2}).required(),
    dob:Joi.string().required()
})
const schemaSignIn=Joi.object({
    password:Joi.string().regex(/^(?=.{6,30})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=/\-|\\{}\[\]\:\;\"\',.<>?`~]).*$/).required(),
    email:Joi.string().email({ minDomainSegments: 2}).required(),
})

module.exports={
    async signUp(req,res,next){
        try {
            const validatedInput = await schemaSignUp.validateAsync({name:req.body.name,password:req.body.password,confirmPassword:req.body.confirmPassword,email:req.body.email,dob:req.body.dob}).catch(e=>{throw new Error(e)})
            res.locals={validatedInput}
            next()
        } catch (e) {
            return res.status(400).send({msg:e.message})
        }
    },
    async signIn(req,res,next){
        try {
            const validatedInput = await schemaSignIn.validateAsync({email:req.body.email,password:req.body.password})
            res.locals={validatedInput}
            next()
        } catch (error) {
            return res.status(400).send({msg:e.message})            
        }
    }
}
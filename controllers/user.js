const db = require('../models')
const dayjs = require('dayjs')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtconfig = require('../jwt')

module.exports={
    async signUp(req,res){
        try {
            const dob = res.locals.validatedInput.dob.split('-')
            const data = await db.user.create({
                name:res.locals.validatedInput.name,
                dob:dayjs().set('date',dob[0]).set('month',dob[1]).set('year',dob[2]).startOf('day'),
                email:res.locals.validatedInput.email,
                password:await bcrypt.hash(res.locals.validatedInput.password,6).catch(e=>{throw new Error(e)}),
                status:'unverified',
                iat:dayjs().unix()
            }).catch(e=>{throw new Error(e)})
            const token = jwt.sign({id:data.id},jwtconfig.secret,{issuer:'yourcompanyname'})
            return res.send({msg:'OK',data:[{token}]})
        } catch (e) {
            return res.status(500).send({msg:e.message})
        }
    },

    async signIn(req,res){
        try {
            const input = res.locals.validatedInput
            const data =await db.user.findOne({
                where:{
                    email:input.email
                },
                raw:true,
                attributes:['id','email','password','status']
            }).catch(e=>{throw new Error(e)})
            if(!data) throw {code:401,message:'email not registered'}
            const result =await bcrypt.compare(validatedInput.password,data.passsword)
            if(!result) throw {code:401,message:'wrong password'}
            await data.update({iat:dayjs().unix()}).catch(e=>{throw new Error(e)})
            const token = jwt.sign({id:data.id},jwtconfig.secret,{issuer:'yourcompanyname'})
            return res.send({msg:'OK',data:[{token}]})
        } catch (error) {
            return res.status(error.code?error.code:500).send({msg:error.message})
        }
    }
}
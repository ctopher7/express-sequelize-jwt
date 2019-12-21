const config = require('../jwt')
const db = require('../models')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

module.exports={
    async isLogin(req,res,next){
        try {
            const decoded = await checkAuth(req).catch(e=>{throw e})
            res.locals={decoded}
            next()
        } catch (error) {
            return res.status(error.code?error.code:500).send({msg:error.message})
        }
    }
}

async function checkAuth(req){
    if (!req.headers.token)throw {code:401,message:'not login'}
    let temp
    jwt.verify(req.headers.token,config.secret,{issuer:'yourcompanyname'},async function(err,decoded){
        if(err)throw {code:400,message:'bad request'}
        const data = await db.user.findOne({where:{id:decoded.id}}).catch(e=>{throw new Error(e)})
        if(!data || dayjs(decoded.iat).add(7,'day')<dayjs() ||decoded.iat<data.iat) throw {code:401,message:'token expired'}
        temp=decoded
    })
    return temp
}
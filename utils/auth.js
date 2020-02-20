const config = require('../jwt')
const db = require('../models')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

module.exports={
    isLogin:(req,res,next)=>{
        checkAuth(req,(err,decoded)=>{
            if(err)return res.status(err.code||500).send({msg:err.message})
            res.locals={decoded}
            next()
        })
    }
}

async function checkAuth(req,cb){
    if (!req.headers.token)cb({code:401,message:'not login'})
    jwt.verify(req.headers.token,config.secret,{issuer:'yourcompanyname'},async function(err,decoded){
        if(err)cb({code:400,message:'bad request'})
        const data = await db.user.findOne({where:{id:decoded.id}}).catch(e=>{cb(new Error(e))})
        if(!data || dayjs.unix(decoded.iat).add(7,'day')<dayjs() ||decoded.iat<data.iat) cb({code:401,message:'token expired'})
        cb(null,decoded)
    })
}
const app = require('express')()
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')

const routesBuilder=(directory)=>{
  fs.readdirSync(directory,{ withFileTypes: true }).map(item=>{
    if(item.name.includes('.js')) item.name=item.name.replace('.js','')
    if(item.isFile()){
      const route =require(`${path.resolve(directory, item.name)}`)
      app.use(route.routePath,route.router)
    }
  })
}

routesBuilder('./routes')

const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const {headerApi} = require('./utils/header')

const nodeEnv = process.env.NODE_ENV
if (nodeEnv === 'development') {var envPath = path.resolve('.env.development')} 
else if (nodeEnv === 'test') {var envPath = path.resolve('.env.test')} 
else if (nodeEnv === 'production') {var envPath = path.resolve('.env.production')}

require('dotenv').config({path: envPath})

app.disable('x-powered-by') 

app.use(cors())
app.use(compression())
app.use(helmet())
app.all('*',headerApi)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.disable('x-powered-by') 

app.use((req, res, next)=>{res.sendStatus(404)})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.sendStatus(err.status || 500)
})

module.exports = app

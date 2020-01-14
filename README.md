# express-sequelize-jwt
express framework using sequelize (ORM) and JWT

before using, you need to:
- modify your jwt secret key on jwt.js
- modify your jwt issuer 
- modify your database config on config/config.json

using PM2:
```
npm install
npm install -g pm2
pm2 start ecosystem-prod.config.js
```

using npm cli:
```
npm install
npm start
```
API: user sign up, user sign in


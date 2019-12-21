# express-sequelize-jwt
express framework using sequelize (ORM) and JWT


using PM2:

npm install

//modify your jwt secret key on jwt.js

//modify your database config on config/config.json

pm2 start ecosystem-prod.config.js


using npm cli:

npm install

//modify your jwt secret key on jwt.js

//modify your database config on config/config.json

npm start

API: user sign up, user sign in


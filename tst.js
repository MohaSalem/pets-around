const user = require('./models/User');
const config = require('config');

console.log(config.get('jwtSecret'));

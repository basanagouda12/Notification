console.log("inside dg - config 1");
const { Pool } = require("pg");

 const config = {
 	host: 'localhost',
 	port: '5432',
 	database: 'task',
 	user: 'postgres',
 	password: '9902'
};
 const pool = new Pool(config);


module.exports = pool;

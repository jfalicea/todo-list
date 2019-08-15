    //Import the dotevn module.   Call its '.config()' method
require('dotenv').config();

const pgp = require('pg-promise')({
    // query:(e)=> console.log(e) //logs sql queries to the console. 
});
    //here you format the connection information. USING the infomraiton within the dotenv file. 
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

module.exports = db; 

    


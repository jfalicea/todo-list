    //Import the dotevn module.   Call its '.config()' method
require('dotenv').config();
const pgp = require('pg-promise')();
    //here you format the connection information. USING the infomraiton within the dotenv file. 
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_Name  
});




console.log(db)


        //sanity_check
console.log('helloWorld.')
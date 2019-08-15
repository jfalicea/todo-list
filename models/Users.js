//1. Collect and prep Ingredients
const db = require('../db');

//2. Cook. 
async function getAll(){
    const users =  await db.any(
    `
        select * from users
    `)
     return users 
}

async function getOne(id){
    try{
    const user = await db.one(`
        select*from users where id=$1    
        `,[id]);
    const  todosForUser  = await db.any(`
    select * from todos where user_id=$1
    `,[id])
    user.todos = todosForUser
    return user; 
} 
catch (error){
    console.log('There was an error retreiving users!')
    return{
        id:0,
        displayname: 'no user found" '
    }
}
}

//3. Serve. 
module.exports = {
    getAll,
    getOne
};
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
        displayname: 'no user found'
    }
}
}
    //accetp an object argument so we have flexiblity later on
    //that is , we can add more dtabase columns 
    // without having to update all of our function calls
//async function createUser(userDataObj){    // same as line 36
async function createUser({displayname, username}){
    // const {displayname, username} = userDataObj
    const newUserInfo = await db.one(`
        INSERT INTO users 
            (displayname, username)
        VALUES ($1, $2)
        
        returning id

    `,[displayname,username]);
    console.log (newUserInfo)
    return newUserInfo
}


// createUser({
//     displayname: 'Ratz',
//     username: 'frankieTwoFists'
// })






//3. Serve. 
module.exports = {
    getAll,
    getOne,
    createUser
};
//1. Collect and prep Ingredients
const db = require('../db');

//2. Cook. 
function getAll(){
    return db.any(
    `
        select * from users
    `)
        .catch((error)=>{
            console.log(`errors getting users`)
            console.log(error)
        })
}

function getOne(id){
    return db.one(`
        select*from users where id=$1    
        `,[id])
        .then((user)=>{
            //get the todos for any users. 
            const todos = db.any(`
                select * from todos where user_id=$1
            `,[id])
            .then((todosForUser)=>{
                console.log(todosForUser);
                user.todo = todosForUser
                return user
            })
            return todos
        })
        .catch((error)=>{
            console.log('Error getting user')
            console.log(error)
        })
}

//3. Serve. 
module.exports = {
    getAll,
    getOne
};
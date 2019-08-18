const db = require('../db')    
    
    //using pg-promise ONE and ONLY ONE.  RETURNS a single object. it'll error if: there is 0 items or MORE than 1.   This is good for getting unique items. 
async function getOne(id){    
     try{  
        const oneTask = await db.one(`
            SELECT * FROM todos
            WHERE id = $1                  
            `,[id])     
            return oneTask
        }
    catch(error){
        console.log('uh oh');
        console.log(error);
        return{}
    }
 }

 //SQL Query must be a string.  #pg-promise ANY RETURNS AN ARRAY OF OBJECTS. 
async function getAll(){
    try{
        return allTasks = await db.any(`
        SELECT * FROM todos;
        `)      
    }
    catch(error){
        console.log('uh ohfda');
        console.log(error);
        return []
    }
}
async function createTodo({priority,task,user_id}){
    const newTodo = await db.one(`
        INSERT INTO todos
            (priority, task, user_id)
        values ($1, $2, $3)
        returning *
    `, [priority, task, user_id])
    console.log(newTodo);
    return newTodo
}
module.exports={
//if the key name is the same as the value you can just use the key. 
//getAll : getAll ===>  this is called enhanced object literalsyntax. 
    getAll, 
    getOne,
    createTodo
}


    
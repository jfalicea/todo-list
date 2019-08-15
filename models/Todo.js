const db = require('../db')    
    
    //using pg-promise ONE and ONLY ONE.  RETURNS a single object. it'll error if: there is 0 items or MORE than 1.   This is good for getting unique items. 
async function getOne(id){    
    const oneTask = await db.one(`
        SELECT * FROM todos
        WHERE id = $1                  
        `,[id]
    )
            // .then((data)=>{  //THEN get the data back from the query. 
            //     console.log(`here is the data:`);
            //     console.log(data);  //pass the variable into to get the data!
            // })       
        return oneTask
    }

 //SQL Query must be a string.  #pg-promise ANY RETURNS AN ARRAY OF OBJECTS. 
async function getAll(){
    const allTasks = await db.any(`
    SELECT * FROM todos;
    `)      
    return allTasks
}

module.exports={
//if the key name is the same as the value you can just use the key. 
//getAll : getAll ===>  this is called enhanced object literalsyntax. 
    getAll, 
    getOne
}

    
/*------------------------------------------
* ORIGINAL Way to handle HTTP Requests
------------------------------------------*/
// const http = require(`http`);
// const Todo = require('./models/Todo')


/*------------------------------------------
HOW TO CREATE A SERVER WITHOUT EXPRESS. 
------------------------------------------*/
// const server = http.createServer((request, response)=>{
//     const allTodos = Todo.getAll()
    
//     allTodos.then((data)=>{ 
//         let jsonData = JSON.stringify(data[0].task)
//         response.end("Task: "+jsonData);
//     });
// });
// server.listen(3000); 

/*------------------------------------------
* HOW TO USE EXPRESS.js
------------------------------------------*/
const express = require('express'); // replace http with 'express'
const Todo = require('./models/Todo')
const app = express();    //create the server and call it "app"  
const port = 3000;  //variable for the port number. 
    

app.get('/todos/:taskId', (req, res)=>{
    console.log("you asked for specific task.")
    console.log(req.params.taskId)
    const theId = parseInt(req.params.taskId, 10);
    const aTodo =Todo.getOne(theId);
    aTodo.then((data)=>{
        res.json(data)
    })
});

app.get('/todos',(request, response)=>{
    const allTodos = Todo.getAll()
    allTodos.then((data)=>{ 
        // let jsonData = JSON.stringify(data);
        // response.end("Task: "+jsonData);
        response.json(data);
    })
});

app.listen(port);






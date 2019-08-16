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
const Users = require('./models/Users')
const app = express();    //create the server and call it "app"  
const port = 3000;  //variable for the port number. 
// Use the urlencoded middleware to read POST bodies
const {sanitizeBody} = require('express-validator');
        // templating language. 
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer)
app.set('views', 'views')
    //Notes: consider learning ejs or pug for view engines!!
app.set('view engine', 'html')

app.use(express.urlencoded({extended: true}));    
app.use((req, res, next)=>{
    console.log('I AM MIDDLEWARE.');
    console.log(req.url);
    next()
})


app.get('/todos/:taskId', (req, res)=>{
    // console.log("you asked for specific task.")
    // console.log(req.params.taskId)
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

app.get('/users',async(req, res)=>{
    const allUsers = await Users.getAll();
    res.json(allUsers);
});
app.get('/users/:userId',async (req, res)=>{
    const theId = parseInt(req.params.userId,10);
    const aUser = await Users.getOne(theId);
    res.json(aUser);
});

app.post('/users', [
    sanitizeBody('username').escape(),
    sanitizeBody('displayname').escape()
],async(req, res)=>{
    console.log('we got a post request!');
    // .send() is DEFFERENT than .end()
    console.log('here is the body: ')
    console.log(req.body);
    
    const newUserInfo = await Users.createUser(
        // displayname: req.body.displayname,
        // username: req.body.username
        req.body
        )
    res.json(newUserInfo)
    // res.send('good job');
})

app.post('/users/:userid/todos', async (req, res)=>{
    console.log(req.params.userid)
    req.body.user_id = req.params.userid
    console.log("hello", req.body)
    const newTask = await Todo.createTodo(req.body)
    res.json(newTask)
})

app.listen(port);






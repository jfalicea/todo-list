const http = require(`http`);
const Todo = require('./models/Todo')



const server = http.createServer((request, response)=>{
    const allTodos = Todo.getAll()
    
    allTodos.then((data)=>{ 
        let jsonData = JSON.stringify(data[0].task)
        response.end("Task: "+jsonData);
    });
});
server.listen(3000); 



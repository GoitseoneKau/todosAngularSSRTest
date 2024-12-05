import express from "express";
import users from '../assets/users.json'
import todos from '../assets/todos.json'
import { Todo } from "../app/types/todo";
// import { Todo } from "../app/types/todo";
// import { User } from "../app/types/user";



const router = express.Router();
router.use(express.json())



//CRUD functions for Posts

//get all
router.get('/users', (request,response)=>{//get is a request fuction from client
    response.json(users.users)//response to client, in json
})


//get one user
router.get('/users/:id',(request,response)=>{//get is a request fuction from client
    const id = parseInt(request.params.id)
    response.json(users.users.find((user: { id: number; })=>user.id===id))//response to client, in json
})

//post a new user
router.post('/users',(request,response)=>{//get is a request fuction from client
 
    let user = request.body
    user.id = users.users.length+1

    if(user){
        users.users.push(user)
        response.json(users)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.
    }
})

//update a user
router.put('/users/:id',(request,response)=>{//get is a request fuction from client
    let user = request.body
    let id = parseInt(request.params.id)
    if(user){
        const userToUpdate = users.users.find((user: { id: number; })=>user.id===id)
        if(userToUpdate){
           
            userToUpdate.email =user.email
            userToUpdate.firstName =user.firstName
            userToUpdate.lastName =user.lastName
            userToUpdate.password =user.password
            userToUpdate.phone =user.phone
           
            response.json(users.users)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.

        }else{
            response.json({message:"user was not found"})
        }
    
    }
})


//delete a user
router.delete('/users/:id',(request,response)=>{//get is a request fuction from client
    let user = request.body
    let id = parseInt(request.params.id)
    if(user){
        const userToDelete = users.users.find((user: { id: number; })=>user.id === id)
        if(userToDelete){
            const newList =users.users.filter((user: { id: number; })=>user.id !== id)

            users.users = newList

            response.json(newList)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.

        }else{
            response.json({message:"user was not found"})
        }
    
    }
})




//CRUD functions for Todos

//get all todos
router.get('/todos',(request,response)=>{//get is a request fuction from client
    response.json(todos.todos)//response to client, in json
})

//get one todo
router.get('/todos/:id',(request,response)=>{//get is a request fuction from client
    let id = request.params.id
    response.json(todos.todos.find((todo: { id: number; })=>todo.id===+id))//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.
})

//post a new todo
router.post('/todos',(request,response)=>{//get is a request fuction from client
    let todo = request.body
    todo.id = todos.todos.length+1
   
    todos.todos.push(todo)
    response.json(todos.todos)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.
    
})


//edit todo
router.put('/todos/:id',(request,response)=>{//get is a request fuction from client
    let todo = request.body as Todo
    let id = parseInt(request.params.id)
    
        const todoToUpdate = todos.todos.find((todo: { id: number; })=>todo.id===id) as Todo
        if(todoToUpdate){
            todoToUpdate.todo =todo.todo
            todoToUpdate.priority =todo.priority
            todoToUpdate.priorityColor =todo.priorityColor
            todoToUpdate.dueDate = todo.dueDate
            todoToUpdate.completed =todo.completed
            todos.todos.map((todo)=>todo.id===todoToUpdate.id?{...todo,todoToUpdate}:todo)
            console.log(todos.todos)
            response.json(todos.todos)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.

        }else{
            response.json({message:" was not found"})
        }
    
    
})


//delete todo
router.delete('/todos/:id',(request,response)=>{//get is a request fuction from client
    let todo = request.body
    let id = parseInt(request.params.id)

 

    if(todo){
        const todoToDelete = todos.todos.find((todo: { id: number; })=>todo.id === id)
        if(todoToDelete){
            const newList =todos.todos.filter((todo: { id: number; })=>todo.id !== id)

            todos.todos = newList
       
            response.json(newList)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.

        }else{
            response.json({message:"user was not found"})
        }
    
    }
})




export default router;



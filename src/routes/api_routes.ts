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
    const {email,q_password} = request.query
    if(email && q_password){
        const users_data = users.users.find((user)=>user.email==email && user.password==q_password)!

        if( users_data){
            const { password, ...user } = users_data
            response.json({exists:true,user:user})//response to client, in json 
        }else{
             response.json({exists:false})//response to client, in json 
        }
    }else{
        const users_data = users.users.map((user) => {
            const { password, ...u } = user
            return u
        })
        response.json(users_data)//response to client, in json
    }
  
})

//get one user
router.get('/users/:id',(request,response)=>{//get is a request fuction from client
    const id = parseInt(request.params.id)
    response.json(users.users.find((user: { id: number; })=>user.id===id))//response to client, in json
})

 function getNextUserId(obj:any){
    //create unique userid number looping through object 
    return ( Math.max.apply(Math,obj.map((user: { userId: number })=>user.userId)) + 1 );
  }


//post a new user
router.post('/users',(request,response)=>{//get is a request fuction from client
 
    let user = request.body
    user.id = users.users.length+1
    user.userId = getNextUserId(users.users)

    if(user){
        users.users.push(user)
        response.json(users)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.
    }else{
        response.json({message:"user not created"})
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

            users.users.map((user)=>user.id===userToUpdate.id?{...user,userToUpdate}:user)

            response.json(userToUpdate)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.

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
            users.users.filter((user: { id: number; })=>user.id !== id)

            response.json(userToDelete)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.

        }else{
            response.json({message:"user was not found"})
        }
    
    }
})




//CRUD functions for Todos

//get all todos
router.get('/todos',(request,response)=>{//get is a request fuction from client
     const {userId} = request.query
     if(userId){
        const user_todos = todos.todos.filter((todo)=>todo.userId == +userId!)
        response.json(user_todos)//response to client, in json
     }else{
           response.json(todos.todos)//response to client, in json
     }
})

//get one todo
router.get('/todos/:id',(request,response)=>{//get is a request fuction from client
    let id = request.params.id
    response.json(todos.todos.find((todo: { id: number; })=>todo.id===+id))//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.
})

//post a new todo
router.post('/todos',(request,response)=>{//get is a request fuction from client
    let todo = request.body
  if(todo){
        todo.id = todos.todos.length+1
        todos.todos.push(todo)
        response.json(todo)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.
    }else{
        response.json({message:"todo was not created"})
    }
    
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
   
            response.json(todoToUpdate)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.

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
            todos.todos = todos.todos.filter((todo: { id: number; })=>todo.id !== id)
       
            response.json(todoToDelete)//201 'Created' - Indicates that the request has succeeded and a new resource has been created as a result.

        }else{
            response.json({message:"todo was not found"})
        }
    
    }
})




export default router;



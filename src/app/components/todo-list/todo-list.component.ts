import { booleanAttribute, Component, DestroyRef, ElementRef, inject, ViewChild} from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/user';
import { delay } from 'rxjs';


@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoComponent,FormsModule,CommonModule,HeaderComponent,DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
//initialize variables
  Todos:Todo[]=[]
  search:string="All"
  completeFilter:string="All"
  isLoggedIn:boolean=false
  todayDate = new Date();
  user!:User
  destroyRef = inject(DestroyRef)
  userId:any
  isHighZero:boolean = false
  isMedZero:boolean = false
  isLowZero:boolean=false
  todoIsComplete:any
todoPriority:any

  constructor(private todos:TodosService,
    private users:UsersService,
    private router:Router,
    private loginService:LoginService,
    private activatedRoute:ActivatedRoute){//inject services
  
  }

  ngOnInit(){
    this.isLoggedIn = this.loginService.isLoggedIn()
    const Id = parseInt(this.activatedRoute.snapshot.paramMap.get('uid')!)
    this.getUser(Id)
    this.todos.getTodos().subscribe(data=>{
      this.Todos=data.filter(d=>d.userId===+this.userId)
      this.checkEmptyTodosOnPage(this.Todos)
      this.updateStatus(this.completeFilter)
    })
    this.checkEmptyTodosOnPage(this.Todos)
  }

  ngOnDestroy(){
  
  }

  ngAfterViewInit(){//after component loads 
    
   const todos = this.todos.getTodos().subscribe(data=>{
    this.Todos=data.filter(d=>d.userId===+this.userId)
    this.checkEmptyTodosOnPage(this.Todos)
    this.updateStatus(this.completeFilter)
  })

  // this.destroyRef.onDestroy(()=>todos.unsubscribe())
  }

  //get user according to userId
  getUser(userId:any){
    if(this.users){
      const user = this.users.getUser(userId).subscribe((user)=>{
        this.user=user
        this.userId =user.userId
      })

    }
  }


  //tick the check button/complete check button
  checkTodo(todo:Todo){
    //change the completed status/boolean
    todo.completed = !todo.completed

    //update complete
    const updateComplete = this.todos.updateTodos(todo).subscribe()
    
    //update todos after completed check
    this.updateStatus(this.completeFilter)
    this.checkEmptyTodosOnPage(this.Todos)

   
  }

  deleteTodo(todo:Todo){//function to delete todo

    //delay delation of element to time with animation
    const delayDelete = this.todos.deleteTodo(todo).pipe(delay(1000));

    //delete todo
    const deleteTodo = delayDelete.subscribe(()=>this.Todos=this.Todos.filter(t=>t.id !== todo.id))



    this.checkEmptyTodosOnPage(this.Todos)
  }

  getNextId(obj:any){
    //get unique id in object list/array
    return (Math.max.apply(Math,obj.map((o: { id: number })=>o.id))+1);
  }

  addTodo(){
    //navigate to the add todo form page
    this.router.navigate(["/add",this.user.userId])
  }


  editTodo(todo:Todo){
    //navigate to the edit todo form page
    this.router.navigate(["/edit",todo.id])
  }


  //filter todos according to status
  updateStatus(e:any){

    this.todoIsComplete = e
    this.isHighZero= false
    this.isMedZero = false
    this.isLowZero=false
    
    if(this.todoIsComplete==="All"){//show all todos
      const all = this.todos.getTodos().subscribe(data=>{ 
        this.Todos=data.filter(d=>d.userId===+this.userId)
        //update empty todos
        this.checkEmptyTodosOnPage(this.Todos)
      })



    
    }else{
      const filtered =  this.todos.getTodos().subscribe(data=>{
          this.Todos=data.filter((d)=>d.completed === booleanAttribute(this.todoIsComplete)&&d.userId===+this.userId)
        
          //update empty todos
          this.checkEmptyTodosOnPage(this.Todos)
      })
      
    }
  }


  //update page according to todo priorities
  updatePriority(e:any){
    this.todoPriority = e
    this.isHighZero= false
    this.isMedZero = false
    this.isLowZero=false
    
    if(this.todoPriority==="All"){//set page to show all todos of various priority

      //get all todos of the user
     const all = this.todos.getTodos().subscribe(data=> {
        this.Todos=data.filter(d=>d.userId===+this.userId)
        ///update todos that have status set
        this.updateStatus(this.todoIsComplete)
        //update empty todos
        this.checkEmptyTodosOnPage(this.Todos)
    })

     //unsubscribe
    

     
    }else{
       //filter todos according to priority
     const filtered =  this.todos.getTodos().subscribe(data=>{
        this.Todos=data.filter((d)=>d.priority ===this.todoPriority&&d.userId===+this.userId)
        //update todos
        this.updateStatus(this.todoIsComplete)
        this.checkEmptyTodosOnPage(this.Todos)

      })
 
    }
  }


  checkEmptyTodosOnPage(todos:Todo[]){//checks if todos are empty after they have been filtered
    if(todos.filter((data)=>data.priority=="High").length==0){
      this.isHighZero=true
    }else{
      this.isHighZero=false
    }
    if(todos.filter((data)=>data.priority=="Medium").length==0){
      this.isMedZero=true
    }else{
      this.isMedZero=false
    }
    if(todos.filter((data)=>data.priority=="Low").length==0){
      this.isLowZero=true
    }else{
      this.isLowZero=false
    }
  }

}

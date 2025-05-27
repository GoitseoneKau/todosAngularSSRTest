import { booleanAttribute, Component, DestroyRef, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo';
import {  CommonModule, DatePipe, ViewportScroller } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/user';
import { delay, Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';



@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoComponent,FormsModule,CommonModule,HeaderComponent,DatePipe,NgxSpinnerModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit,OnDestroy {
//initialize variables
  Todos:Todo[]=[]
  filteredTodos: Todo[]=[];
  subscribedTodos?: Subscription;
  isLoggedIn:boolean=false
  todayDate = new Date();
  user!:User
  destroyRef = inject(DestroyRef)
  userId:number=0
  isHighZero:boolean = false
  isMedZero:boolean = false
  isLowZero:boolean=false
  todoIsCompleteFilter:string|boolean = "All"
  todoPriorityFilter:string="All"
  bdcolor: string="";
  ani_color: string="";
  loadingMessage: string="";

  showScrollButton = false;
  private scrollThreshold = 200;

  constructor(
    private todos:TodosService,
    private users:UsersService,
    private router:Router,
    private loginService:LoginService,
    private activatedRoute:ActivatedRoute,
    private loaderService:LoaderService,
    private viewportScroller: ViewportScroller
  ){ }//inject services 

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > this.scrollThreshold;
  }

  scrollToTop() {
     window.scrollTo({top:0,left:0,behavior:'smooth'})
  }

  ngOnInit(){
    //check if user is logged in
    this.isLoggedIn = this.loginService.isLoggedIn()
    //store user id
    const uid= parseInt(this.activatedRoute.snapshot.paramMap.get('uid')!)
    this.getUser(uid)



    //open loading animation
    this.loaderService.loading()

    //set background color to white,80% opacity
    this.bdcolor="rgba(255,255,255,0.8)"

    //set loader color to red
    this.ani_color ="#f81212"

    //set message
    this.loadingMessage="Loading.."

    this.loadTodos(uid)
    
 
  }

  ngOnDestroy(){
      this.subscribedTodos?.unsubscribe()//unsubscribe to todos subscription
  }

  //load todos
  loadTodos(userId:number){
    this.subscribedTodos = this.todos.getTodos(userId).pipe(delay(1000)).subscribe({
      next:(data)=>{
        //store filtered todos by user, sorted by dates in descending order
        this.Todos=data
        .sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

        //store data for filtering,speeds up search
        this.filteredTodos=this.Todos

        //update ui according to status in select control
        this.updateStatus(this.todoIsCompleteFilter)
      },
      complete:()=>{//post services completes or returns complete response

        //change loader to green
        this.ani_color="rgb(2,177,75)"

         //change message
         this.loadingMessage="Complete"

         //unload animation after 2 seconds, set 'signedUp' to true
        this.loaderService.unloading() 
       
     }
    })
  }

  //get user according to userId
  getUser(userId:number) {
     this.userId = userId
    if(this.loginService.user){
      this.user = this.loginService.user
    }
 
  }

  //tick the check button/complete check button
  checkTodo(todo:Todo){
    //change the completed status/boolean
    todo.completed = !todo.completed

    //update complete
    const updateComplete = this.todos.updateTodos(todo).subscribe()

    //update empty todos
    this.checkEmptyTodosOnPage(this.Todos)

    //unsubscribe after update
    //this.destroyRef.onDestroy(()=>updateComplete.unsubscribe())
  }

  deleteTodo(todo:Todo){//function to delete todo

    //delete todo
    this.todos.deleteTodo(todo).pipe(delay(1000)).subscribe(()=>{
      this.Todos=this.Todos.filter(t=>t.id !== todo.id).sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

    //store data for filtering,speeds up search
    this.filteredTodos=this.Todos

    //update ui according to status in select control
    this.updateStatus(this.todoIsCompleteFilter)

    })

    

    //unsubscribe after deletion operation
    //this.destroyRef.onDestroy(()=>deleteTodo.unsubscribe())
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
  updateStatus(e:string|boolean){

    this.todoIsCompleteFilter = e
    
    if(this.todoIsCompleteFilter==="All"){//show all todos  


        //filter to all todos of user's ID
        this.Todos = this.filteredTodos
        .sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

        //update empty todos
        this.checkEmptyTodosOnPage(this.Todos)
   
    }else{   
     

          //filter completed/incompleted todos
          this.Todos = this.filteredTodos
          .filter((t)=>t.completed === booleanAttribute(this.todoIsCompleteFilter) )
          .sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

          //update empty todos
          this.checkEmptyTodosOnPage(this.Todos)
      
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

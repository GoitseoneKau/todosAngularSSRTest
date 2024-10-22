import { LoginService } from './../../services/login.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { DatePipe, Location, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../types/user';
import { Todo } from '../../types/todo';
import { TodosService } from '../../services/todos.service';
import { MinDateValidator } from '../../customValidators/min-date-validator';


@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,DatePipe],
  providers:[DatePipe],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {

  addForm!:FormGroup//variable to access add todo form
  userId:any
  todos:Todo[]=[]
  minDate = new Date()
  destroyRef = inject(DestroyRef)//inject destroy service class
  
    constructor(
      private router:Router,
      public LoginService:LoginService,
      private todoService:TodosService,
      private activeRoute:ActivatedRoute,
      private location:Location,
      private fb:FormBuilder,
      private dp:DatePipe){//inject services

      this.addForm = this.fb.group({//set form values
       todo: new FormControl("",[
          Validators.required,
          Validators.pattern("^[\\w\\s\\S\\@]*$")
        ]),
        priority: new FormControl("High",[
          Validators.required,
        ]),
        dueDate: new FormControl("",[
          Validators.required,MinDateValidator.dateMin(this.minDate)//customised date validator
        ])
      })
    }

    ngOnInit(){
      this.userId = this.activeRoute.snapshot.paramMap.get('uid')//get user unique id
      const getTodos = this.todoService.getTodos().subscribe((todos)=>this.todos = todos)//get todo
    
    }

    getNextId(obj:any){
      return (Math.max.apply(Math,obj.map((o: { id: number })=>o.id))+1);///get next id from array/object list
    }

    setPriorityColor(priority:string):string{//set priority color according to priority text
      let color=""

      if(priority=="High"){   color="#db0d0d" }

      if(priority=="Medium"){ color="Orange"  }

      if(priority=="Low"){    color="#eded15" }

      return color
    }

    addTodo(){//submit todo
      const todoData = this.addForm.value as Todo//store form ata User type format
      //insert extra info the form does not show automatically/dynamically
      todoData.userId = +this.userId
      todoData.priorityColor = this.setPriorityColor(todoData.priority)
      todoData.completed = false
    
     const add =  this.todoService.postTodo(todoData).subscribe()//post new todo
    //  this.destroyRef.onDestroy(()=>add.unsubscribe())//unsuscribe when component is destroyed nd service not in use
      this.location.back()//redirect to todos page
      
    }

    cancel(){
      this.location.back()//navigate back to toos page
    }
}

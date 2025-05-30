import { LoginService } from './../../services/login.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { DatePipe, Location, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../types/user';
import { Todo } from '../../types/todo';
import { TodosService } from '../../services/todos.service';
import { MinDateValidator } from '../../customValidators/min-date-validator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  providers:[DatePipe],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {

  addForm!:FormGroup//variable to access add todo form
  userId:any
  minDate = new Date(); //date to check again input date
  destroyRef = inject(DestroyRef)//inject destroy service class
  
    constructor(
      private router:Router,
      public LoginService:LoginService,
      private todoService:TodosService,
      private activeRoute:ActivatedRoute,
      private location:Location,
      private fb:FormBuilder
   ){//inject services

      this.addForm = this.fb.group({//set form values
       todo: new FormControl("",[
          Validators.required,
          Validators.pattern("^[\\w\\s\\S\\@]*$")
        ]),
        priority: new FormControl("High",[
          Validators.required,
        ]),
        dueDate: new FormControl("",[
          Validators.required,MinDateValidator.dateMin()//customised date validator
        ])
      })
    }

    ngOnInit(){
      this.userId = this.activeRoute.snapshot.paramMap.get('uid')//get user unique id
    }

    ngOnDestroy(){
      // this.subscriptionTodo.unsubscribe()
    }
    

 

    setPriorityColor(priority:string):string{//set priority color according to priority text
      let color=""

      if(priority=="High"){ color="#db0d0d" }//if priority 'High', set color to a  'red' shade
      if(priority=="Medium"){ color="Orange"  }//if priority 'Medium', set color to 'orange'
      if(priority=="Low"){ color="#eded15" }//if priority 'Low', set color to a 'yellow' shade

      return color
    }

    addTodo(){//submit todo
      const todoData = this.addForm.value as Todo//store form ata User type format
      //insert extra info the form does not show automatically/dynamically
      todoData.userId = +this.userId
      todoData.priorityColor = this.setPriorityColor(todoData.priority)
      todoData.completed = false
    
     this.todoService.postTodo(todoData).subscribe(()=>this.location.back())//post new todo
    
      
      
    }

    cancel(){
      this.location.back()//navigate back to toos page
    }
}

import { ActivatedRoute, Router } from '@angular/router';
import { Component, DestroyRef, inject } from '@angular/core';
import { Todo } from '../../types/todo';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf, DatePipe, Location } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { MinDateValidator } from '../../customValidators/min-date-validator';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers: [DatePipe],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css',
})
export class EditTodoComponent {
  editForm!: FormGroup; //variable to access the editi form
  Todo!: Todo; //todo format variable
  todoId: any; //todo id
  todoText: string = ''; //todo text/description
  prioritytext: string = ''; //todo priority variable
  todoDate: Date = new Date(); //todo date variable
  minDate = new Date(); //date to check again input date
  destroyRef = inject(DestroyRef); //inject destroy service class

  constructor(
    private router: Router,
    private todoService: TodosService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private dp: DatePipe
  ) {
    //inject services
  }

  ngOnInit() {
    this.todoId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!); //get todo id from url or route path

    this.setTodo(this.todoId); //set the todo to be edited
    this.editForm = this.fb.group({
      //get form values and validate
      todo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w\\s\\S]*$'), //regex validator,allows words and character and spaces
      ]),
      priority: new FormControl('', [Validators.required]), //this.dp.transform(todo.dueDate,"yyyy-MM-ddThh:mm:ss")
      dueDate: new FormControl('', [
        Validators.required,
        MinDateValidator.dateMin(), //custom date validator
      ]),
    });
  }



  setTodo(id: number) {
    this.todoService.getTodo(id).subscribe(
      (todo) => {
        this.Todo = todo; //set todo to local variable of todo

        this.editForm.setValue({
          todo: this.Todo.todo,
          priority: this.Todo.priority,
          dueDate: this.dp.transform(this.Todo.dueDate, 'yyyy-MM-ddThh:mm'),
        });
      }
    );
  }

  editTodo() {
    //edit or submit updated info
    //get edited todo info
    this.Todo.todo = this.editForm.get('todo')?.value;
    this.Todo.dueDate = this.editForm.get('dueDate')?.value;
    this.Todo.priority = this.editForm.get('priority')?.value;
    this.Todo.priorityColor = this.setPriorityColor(this.Todo.priority);

    const update = this.todoService.updateTodos(this.Todo).subscribe( ()=>{
      this.destroyRef.onDestroy(()=>update.unsubscribe())
      this.location.back()
    } ); //post updated todo

    

 
  }

  setPriorityColor(priority: string): string {
    //function to set color according to priority
    let color = '';

    if (priority == 'High') {
      color = '#db0d0d';
    }
    if (priority == 'Medium') {
      color = 'Orange';
    }
    if (priority == 'Low') {
      color = '#eded15';
    }

    return color;
  }

  cancel() {
    this.location.back(); //redirect back without editing
  }
}

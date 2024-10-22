import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, viewChild, ViewChild} from '@angular/core';
import { Todo } from '../../types/todo';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [CommonModule,DatePipe],
  providers:[DatePipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  //Access the item div HTML element properties
  @ViewChild('item')
  item!:ElementRef<HTMLElement>
  //Input and Output properties for todo item
  //property attribute
  @Input() todo!:Todo 

  //events attributes
  @Output() onEdit:EventEmitter<Todo>= new EventEmitter()
  @Output() onDelete:EventEmitter<Todo>=new EventEmitter()
  @Output() onCheck:EventEmitter<Todo>=new EventEmitter();

  today = new Date();//Today's date

  constructor(private dp:DatePipe) { }//inject datePipe service

  overDueCheck(todo:Todo){
    //transform date objects with datepipe service
    const now = this.dp.transform(this.today)
    const task = this.dp.transform(todo.dueDate)
    if(new Date(now!)>new Date(task!) && todo.completed==false){
      return true
    }
    return false
  }

  //Methods or Functions for Event attributes
  onCheckTodo(todo:Todo){
    this.onCheck.emit(todo)
  }

  onDeleteTodo(todo:Todo){
     this.item.nativeElement.classList.add("animate__animated","animate__slideOutRight")
     setTimeout(()=>{},1000)
    this.onDelete.emit(todo)
  }

  onEditTodo(todo:Todo){
    this.onEdit.emit(todo)
  }
}

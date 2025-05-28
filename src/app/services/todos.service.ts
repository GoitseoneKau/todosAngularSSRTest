import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../types/todo';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodosService {


    private platformId = inject(PLATFORM_ID)
  
    private host:string = location.origin
  private url:string = `${this.host}/api/todos`

  constructor(private https:HttpClient) { 
    console.log(this.host);
  }

  getTodos(userId:number):Observable<Todo[]>{
    return this.https.get<Todo[]>(`${this.url}?userId=${userId}`)
  }

  getTodo(id:number):Observable<Todo>{
    return this.https.get<Todo>(`${this.url}/${id}`)
  }

  postTodo(todo:Todo):Observable<Todo>{
    return this.https.post<Todo>(this.url,todo)
  }

  deleteTodo(todo:Todo):Observable<Todo>{
    return this.https.delete<Todo>(`${this.url}/${todo.id}`)
  }

  updateTodos(todo:Todo):Observable<Todo>{
    return this.https.put<Todo>(`${this.url}/${todo.id}`,todo)
  }
  
}

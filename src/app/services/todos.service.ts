import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private port:any|number = process.env['PORT'] || 4000
  private url:string = `http://localhost:${this.port}/api/todos`

  constructor(private https:HttpClient) { }

  getTodos():Observable<Todo[]>{
    return this.https.get<Todo[]>(this.url)
  }

  getTodo(id:number):Observable<Todo>{
    return this.https.get<Todo>(`${this.url}/${id}`)
  }

  postTodo(todo:Todo):Observable<Todo[]>{
    return this.https.post<Todo[]>(this.url,todo)
  }

  deleteTodo(todo:Todo):Observable<Todo>{
    return this.https.delete<Todo>(`${this.url}/${todo.id}`)
  }

  updateTodos(todo:Todo):Observable<Todo[]>{
    return this.https.put<Todo[]>(`${this.url}/${todo.id}`,todo)
  }
  
}

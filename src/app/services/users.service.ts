import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private port:any|number = process.env['PORT'] || 4000
  private url:string = `http://localhost:${this.port}/api/users`


  usersBehaviour = new BehaviorSubject<User[]>([])

  constructor(private https:HttpClient) { }
  getMessage(){
    return this.https.get(this.url)
  }

  getUsers():Observable<User[]>{
    return this.https.get<User[]>(this.url)
  }

  getUser(id:number):Observable<User>{
    return this.https.get<User>(`${this.url}/${id}`)
  }

  postUsers(user:User):Observable<User[]>{
    return this.https.post<User[]>(`${this.url}`,user)
  }

  deleteUser(user:User):Observable<User[]>{
    return this.https.delete<User[]>(`${this.url}/${user.id}`)
  }

  updateUser(user:User):Observable<User[]>{
    return this.https.put<User[]>(`${this.url}/${user.id}`,user)
  }
}

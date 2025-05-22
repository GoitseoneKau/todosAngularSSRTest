import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private url:string = `https://localhost:4000/api/users`


   private userSubject = new BehaviorSubject<User|null>(null)

  constructor(private https:HttpClient) {
    
  }

  async checkUser(email:string,password:string){
    
    const user_check =  await fetch(`${this.url}?email=${email}&q_password=${encodeURIComponent(password)}`)
    if(!user_check.ok){
      return {error:"network error, please try again."}
    }

    return user_check.json()
  }

  setUser(user:User){
    this.userSubject.next(user)
  }

  getUser():Observable<User|null>{
    return this.userSubject.asObservable()
  }

  postUser(user:User):Observable<User>{
    return this.https.post<User>(this.url,user)
  }

  deleteUser(user:User):Observable<User>{
    return this.https.delete<User>(`${this.url}/${user.id}`)
  }

  updateUser(user:User):Observable<User>{
    return this.https.put<User>(`${this.url}/${user.id}`,user)
  }
}

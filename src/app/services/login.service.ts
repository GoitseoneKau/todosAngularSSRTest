import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../types/user';
import { UsersService } from './users.service';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user:User | undefined |null
  private readonly platformId = inject(PLATFORM_ID);
  constructor(private userService:UsersService) { }

  checkStorage(){

    if(isPlatformBrowser(this.platformId)){ 
      const userData = sessionStorage.getItem("user")
      if(userData){
        this.user = JSON.parse(userData)
      }else{
        this.user = null
      }
    }
    
  }

  

  login(user:User){
    if(isPlatformBrowser(this.platformId)){ 
      sessionStorage.setItem("user",JSON.stringify(user))
      this.checkStorage()
    }
  }

  isLoggedIn(){
    if(isPlatformBrowser(this.platformId)){ 
      this.checkStorage()
    }
    return this.user !==null
  }

  logout(){
    if(isPlatformBrowser(this.platformId)){ 
      if(!this.isLoggedIn()){return}
      sessionStorage.clear()
      this.checkStorage()
    }
  }
}

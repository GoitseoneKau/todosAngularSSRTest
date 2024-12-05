import { UsersService } from './../../services/users.service';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../types/user';
import { PasswordValidator } from '../../customValidators/password-validator';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup//variable cclass to access login form
  private users:User[]=[]
  testUser: User | undefined;
  message:string=""
  loggedIn!: boolean;

  constructor(private router:Router,private UserService:UsersService,private fb:FormBuilder,private loginService:LoginService){//injection of services
    this.loginForm = this.fb.group({
      email: new FormControl("",[
        Validators.required,
        Validators.pattern("[\\w-\\.]+@([\\w]+\.)+[\\w]{2,4}")
      ]),
      password:new FormControl("",[
        Validators.required,
        PasswordValidator.passwordValidator()//custom password validator
      ])
    })
  }

  ngOnInit(){
    this.UserService.getUsers().subscribe((data)=>{
      this.users = data
    })
  }

  checkUser(user:User):User|undefined{//check if user exists by email
    this.testUser = this.users.find(d=> d.email == user.email )
    return  this.testUser
  }

  checkUserPassword(user:User):User|undefined{//check if user exists by password
    return  this.testUser = this.users.find(d=>d.email==user.email && d.password==user.password )
  }

  login(){//login function
  
    if(this.checkUser(this.loginForm.value as User)){
      if(this.checkUserPassword(this.loginForm.value as User)){//if user is found via email and password,login
        const user = this.loginForm.value as User
        user.id = this.testUser!.id
        this.loginService.login(user)//login  through login service
        this.loggedIn = this.loginService.isLoggedIn();//variable to store login truthy value

        this.router.navigate(["/todos",user.id],{ replaceUrl: true })//navigate to user todos page
      }else{//else user does not login and send message to check password
        this.loggedIn = this.loginService.isLoggedIn();
        this.message = "login failed. Check your password"
      }
     
    }else{// else user does not log in and send message about possible email being wrong
      this.loggedIn = this.loginService.isLoggedIn();
      this.message="Oops user is not found. Check your email and password and try again!"
    }
    
  }

  backToSignUp(){
    this.router.navigate(["/signup"],{ replaceUrl: true })//redirect  or navigate to signup page
  }

}
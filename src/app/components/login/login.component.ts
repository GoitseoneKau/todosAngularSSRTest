import { UsersService } from './../../services/users.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../types/user';
import { PasswordValidator } from '../../customValidators/password-validator';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup//variable cclass to access login form
  private users:User[]=[]
  testUser: User | undefined;
  message:string | undefined
  loggedIn: boolean=false;

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


  login(){//login function

    const password = this.loginForm.value.password
    const email = this.loginForm.value.email

   

    this.UserService.checkUser(email,password)
    .then((check_data)=>{
     if(check_data.exists){
       const user = check_data.user as User
    
        this.loginService.login(user)//login  through login service
        this.loggedIn = this.loginService.isLoggedIn();//variable to store login truthy value
        this.UserService.setUser(user)

        this.router.navigate(["/todos",user.userId],{ replaceUrl: true })//navigate to user todos page
     }else{
        this.loggedIn = this.loginService.isLoggedIn();
        this.message = "login failed. Check your password and username"
     }
    })
    .catch((error)=>{
      this.message = "Oops network disconnected. Try again"
    })
  
    
  }

  backToSignUp(){
    this.router.navigate(["/signup"],{ replaceUrl: true })//redirect  or navigate to signup page
  }

}

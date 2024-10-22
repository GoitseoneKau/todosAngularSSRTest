import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { PasswordMatchValidator } from '../../customValidators/password-match-validator';
import { PasswordValidator } from '../../customValidators/password-validator';
import { PhoneNumberValidator } from '../../customValidators/phone-number-validator';
import { delay } from 'rxjs';
import { User } from '../../types/user';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

 signupForm!:FormGroup //class to access form
private Users:User[]=[]//users empty array
userInfo:User | undefined;//undefined single user info
userExistMessage:string=""//empty message for user not existing

  constructor(private router:Router,private fb:FormBuilder,private userService:UsersService){//Injected services
    //assiging formcontrols/variables via a form builder class
        this.signupForm = this.fb.group({
          firstName: new FormControl("",[
            Validators.required,
            Validators.minLength(3)
          ]),
          lastName: new FormControl("",[
            Validators.required,
            Validators.minLength(3)
          ]),
          email: new FormControl("",[
            Validators.required,
            Validators.pattern("[\\w-\\.]+@([\\w]+\.)+[\\w]{2,4}")
          ]),
          phone: new FormControl("",[
            Validators.required,
            PhoneNumberValidator.phoneValidator()//custom phone number validator
          ]), 
          password:new FormControl("",[
            Validators.required,
            PasswordValidator.passwordValidator()//custom password validator
          ]),
          vpassword:new FormControl("",[
            Validators.required,PasswordMatchValidator.passwordCompare()//custom password confirmation validator
          ])
        })

    

  }

  ngOnInit(){
   //set users data whn component intializes
    this.userService.getUsers().subscribe(
      (data)=>{
          this.Users=data
      })
  }

  backToLogin(){
    this.router.navigate(["/"],{replaceUrl:true})//redirect to login page
  }


  getNextId(obj:any){
    return (Math.max.apply(Math,obj.map((o: { id: number })=>o.id))+1);//create unique user id number looping through object 
  }

  getNextUserId(obj:any){
    return (Math.max.apply(Math,obj.map((o: { userId: number })=>o.userId))+1);//create unique userid number looping through object 
  }

  signUp(){//function for signing up/registering user

    //take in form values into single user variable
    this.userInfo={
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value,
      email: this.signupForm.get('email')?.value,
      phone: this.signupForm.get('phone')?.value,
      password:this.signupForm.get('password')?.value,
      id:this.getNextId(this.Users),
      userId :this.getNextUserId(this.Users)
    };
  
    if(this.checkUserExists(this.userInfo)){//check if the user exists
       this.userExistMessage="user already exists"
    }else{//if not already existing, put them inside the databse
      const uploadUser = this.userService.postUsers(this.userInfo).pipe(delay(1000))

      uploadUser.subscribe(()=> this.router.navigate(['/'],{replaceUrl:true}))//redirect to login page
    }
    


   
  }

  checkUserExists(u:User):boolean{//function to check if user exists
    if(this.Users.find((user)=>user.email==u.email)){
      return true
    }
    return false
  }
  
}

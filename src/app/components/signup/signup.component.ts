import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { PasswordMatchValidator } from '../../customValidators/password-match-validator';
import { PasswordValidator } from '../../customValidators/password-validator';
import { PhoneNumberValidator } from '../../customValidators/phone-number-validator';
import { delay } from 'rxjs';
import { User } from '../../types/user';
import { LoaderService } from '../../services/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgxSpinnerModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm!: FormGroup //class to access form
  private userInfo?: User;//undefined single user info
  errorMessage: string = ""//empty message for user not existing
  bdcolor: string = ""
  ani_color: string = ""
  loadingMessage: string = "Loading..."
  signedUp: boolean = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsersService,
    private loginService: LoginService,
    private loaderService: LoaderService
  ) {//Injected services

    //assiging formcontrols/variables via a form builder class
    this.signupForm = this.fb.group({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[\\w-\\.]+@([\\w]+\.)+[\\w]{2,4}")//regex email validation
      ]),
      phone: new FormControl("", [
        Validators.required,
        PhoneNumberValidator.phoneValidator()//custom phone number validator
      ]),
      password: new FormControl("", [
        Validators.required,
        PasswordValidator.passwordValidator()//custom password validator
      ]),
      vpassword: new FormControl("", [
        Validators.required, PasswordMatchValidator.passwordCompare()//custom password confirmation validator
      ])
    })

  }


  backToLogin() {
    this.router.navigate(["/"], { replaceUrl: true })//redirect to login page
  }


  signUp() {//function for signing up/registering user

    //take in form values into single user variable
    this.userInfo = {
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value,
      phone: this.signupForm.get('phone')?.value,
      password: this.signupForm.get('password')?.value,
      email: this.signupForm.get('email')?.value
    }

    //open loading animation
    this.loaderService.loading()

    //set background color to white,80% opacity
    this.bdcolor = "rgba(255,255,255,0.8)"

    //set loader color to red
    this.ani_color = "#f81212"

    //set message
    this.loadingMessage = "Please wait"



    this.userService.checkUser(this.userInfo.email!, this.userInfo.password!)
      .then((check_data) => {
        if (check_data.exists==false) {
          //pipe delay function to post http observable
          const uploadUser = this.userService.postUser(this.userInfo!)//delay http post observable for server response time

          //subscribe to post http observable
          uploadUser.subscribe((user) => {//post services completes or returns complete response

            //change loader to green
            this.ani_color = "rgb(2,177,75)"

            //change message
            this.loadingMessage = "Signed Up"

            this.loginService.login(user)//login  through login service
            this.userService.setUser(user)

           

            //unload animation after 2 seconds, set 'signedUp' to true
            setTimeout(() => {
              this.loaderService.unloading()
              this.signedUp = true
              this.router.navigate(["/todos", user.userId], { replaceUrl: true })//navigate to user todos page
            }, 1000)
          }
          )//after uploaing user data, end loading animation


        } else {
          this.errorMessage = "user email already exists"
        }
      })
      .catch((error) => {
        this.errorMessage = error.error
      })

  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router,private loginService:LoginService){//inject services

  }

  logOut(){
    this.loginService.logout()//use ling service to logout
    this.router.navigate(["/"],{replaceUrl:true})//redirect to login page
  }
}

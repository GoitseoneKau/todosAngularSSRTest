import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  router = inject(Router)//variable injection of Router/angular core service
  
  redirectToLogin(){
    this.router.navigate(["/"],{replaceUrl:true})//redirect to login page when clicked
  }
}

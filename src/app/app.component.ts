import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './types/user';
import { TodosService } from './services/todos.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { UsersService } from './services/users.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JsonPipe,CommonModule,TodoListComponent,FooterComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoApp';
  isLoggedIn =false


  constructor(public loginService:LoginService,private http:HttpClient){}

  ngOnInit(){
    this.isLoggedIn = this.loginService.isLoggedIn()
  }
}

import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import {AddTodoComponent} from './components/add-todo/add-todo.component'
import { RouteGuardService } from './services/route-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"todos/:uid",component:TodoListComponent,canActivate:[RouteGuardService]},
    {path:"signup",component:SignupComponent},
    {path:"edit/:id",component:EditTodoComponent,canActivate:[RouteGuardService]},
    {path:"add/:uid",component:AddTodoComponent,canActivate:[RouteGuardService]}
    // ,
    // {path:"**",component:NotFoundComponent}
   
];

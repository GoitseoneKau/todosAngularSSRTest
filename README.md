<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">

<h1 align="center" style="font-family:Poppins;font-size:4em"> Daily <span style="color:rgb(52, 133, 177)">Todo</span><span><svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M373.5 27.1C388.5 9.9 410.2 0 433 0c43.6 0 79 35.4 79 79c0 22.8-9.9 44.6-27.1 59.6L277.7 319l-10.3-10.3-64-64L193 234.3 373.5 27.1zM170.3 256.9l10.4 10.4 64 64 10.4 10.4-19.2 83.4c-3.9 17.1-16.9 30.7-33.8 35.4L24.3 510.3l95.4-95.4c2.6 .7 5.4 1.1 8.3 1.1c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32c0 2.9 .4 5.6 1.1 8.3L1.7 487.6 51.5 310c4.7-16.9 18.3-29.9 35.4-33.8l83.4-19.2z"/></svg></span> 
</h1>
<h4 align="center" style="font-family:Poppins;font-size:1.2em;margin-top:20px">Give your daily tasks order.</h4>
<p align="center">A simple project highlighting my core skills as Angular developer. It is a todo app with basic functionality and some complex features</p>


## Table of Contents

* [Introduction](#introduction)

* [Cloning](#cloning-and-running-the-app)

* [Features](#features)

* [Preview](#preview)

* [Screenshots](#screenshots)




## Introduction
This is a todo list app with basic functionalities built with Angular 18 and raw CSS3 and HTML.
Mimicks basic **CRUD**_(Create,Update,Delete)_ functions while having smooth UI functionality.







### Cloning and running the app
This is after you download and extract zip file in your desired folder or cloned this project via github
```
//cloning
git clone https://github.com/GoitseoneKau/DailyTodo

//This will install dependencies//
npm install 

//To start the app run these commands//

npm run userServer //This will run json server on port 5001 i.e localhost:5001/users

npm run todoServer//This will run json server on port 5000 i.e localhost:5000/todos

ng serve or npm run start //This will run the angular server
```

*N.B You can change the ports of the JSON servers in the angular.json file*

/angular.json :
```
"scripts:{
     ....,
    "todoServer": "json-server --watch src/assets/todos.json --port 5000",//JSON server script for todos api or json file
    "userServer": "json-server --watch src/assets/users.json --port 5001",//JSON server script for users api or json file
    ....,
}
```
## Features

* API functionality with 2 simulated api calls to local JSON server
* Login functionality with **User Authentication**
* Signup functionality with **Existing User Confirmation**
* Reactive Form Validation
* Custom Validators
* Update Todo Item Functionality
* Remove/Delete Todo Item Functionality
* Add Todo Item Functionality
* Display Stored Todo Items In List Form
* Filtering Functionality According to *__Low to High Priority__* and *__Completed Status__*
* Color Coded Todo Schemes To Visually Identify The Most Importantto Least important Todo

## Screenshots


![Login Screen](/src/assets/images/login.PNG)

![Registration Screen](/src/assets/images/registration.PNG)

![Todo Screen](/src/assets/images/filter.PNG)

## Preview

checkout the preview (Hosted on Vercel) : [Daily Todo](https://daily-todo-one.vercel.app/).

This project is using `Angular 18`.

## Angular 18

> Angular is a web framework that empowers developers to build fast, reliable applications.
Maintained by a dedicated team at Google, Angular provides a broad suite of tools, APIs, and libraries to simplify and streamline your development workflow. Angular gives you a solid platform on which to build fast, reliable applications that scale with both the size of your team and the size of your codebase..
>
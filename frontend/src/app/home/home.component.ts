import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../utils/login.service';
import { TodosService } from '../utils/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  todos: Array<any>;
  todoName: string;
  todoDescription: string;
  password: string;
  passwordText: string;

  constructor(
    private todoService: TodosService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.todos = [];
    this.todoName = '';
    this.todoDescription = '';
    this.password = '';
    this.passwordText = '';
  }

  updatePassword() {
    const username = localStorage.getItem('user');

    if (this.password !== '' && username) {
      this.loginService.updatePassword(username, this.password).subscribe({
        next: (v) => {
          console.log(v);
          this.password = '';
          this.passwordText = v;
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  saveTodo() {
    const user = localStorage.getItem('user');
    const todoName = this.todoName;
    const todoDescription = this.todoDescription;

    if (todoName && todoDescription && user) {
      this.todoService.saveTodo(user, todoName, todoDescription).subscribe({
        next: () => {
          console.log('Save was successfull');
          this.todoName = '';
          this.todoDescription = '';
          this.getAllTodo();
        },
        error: (e) => console.log(e),
      });
    }
  }

  deleteTodo(todo: any) {
    if (todo) {
      this.todoService.deleteTodo(todo.user, todo.name).subscribe({
        next: (v) => {
          console.log(v);
          this.getAllTodo();
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  updateTodo(todo: any) {
    if (todo) {
      localStorage.setItem('todo', JSON.stringify(todo));
      this.router.navigate(['/change']);
    }
  }

  logout() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().subscribe({
        next: (v) => {
          console.log(v);
          this.router.navigate(['/login']);
        },
        error: (e) => console.log(e),
      });
    }
  }

  getAllTodo() {
    const username = localStorage.getItem('user')!;

    this.todoService.getAllTodo(username).subscribe({
      next: (v) => {
        if (v) {
          this.todos = v as any;
        } else {
          this.todos = [];
          console.log('You dont have any todo');
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
    this.getAllTodo();
    localStorage.removeItem('todo');
  }
}

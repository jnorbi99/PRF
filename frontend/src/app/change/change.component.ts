import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from '../utils/todos.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css'],
})
export class ChangeComponent {
  todoName: string;
  todoDescription: string;
  newTodoDescription: string;

  constructor(private todoService: TodosService, private router: Router) {
    this.todoName = '';
    this.todoDescription = '';
    this.newTodoDescription = '';
  }

  updateTodo() {
    const username = localStorage.getItem('user');
    if (username) {
      this.todoService
        .updateTodo(username, this.todoName, this.newTodoDescription)
        .subscribe({
          next: () => {
            console.log('Update was successfull');
            this.newTodoDescription = '';
            localStorage.removeItem('todo');
            this.router.navigate(['/home']);
          },
          error: (e) => console.log(e),
        });
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('todo')) {
      const todo = JSON.parse(localStorage.getItem('todo')!);

      this.todoName = todo.name;
      this.todoDescription = todo.description;
    }
  }
}

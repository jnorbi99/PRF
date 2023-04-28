import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getAllTodo(username: string) {
    return this.http.get(`http://localhost:3000/todo?user=${username}`);
  }

  saveTodo(username: string, name: string, description: string) {
    return this.http.post(
      'http://localhost:3000/todo',
      {
        user: username,
        name: name,
        description: description,
      },
      { responseType: 'text' }
    );
  }

  updateTodo(username: string, name: string, newDescription: string) {
    return this.http.put(
      'http://localhost:3000/todo',
      {
        user: username,
        name: name,
        description: newDescription,
      },
      { responseType: 'text' }
    );
  }

  deleteTodo(username: string, todoName: string) {
    return this.http.delete('http://localhost:3000/todo', {
      body: {
        user: username,
        name: todoName,
      },
      responseType: 'text',
    });
  }
}

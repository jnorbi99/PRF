import { Component } from '@angular/core';
import { TodosService } from './utils/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private todoService: TodosService) {}

  title = 'frontend';
}

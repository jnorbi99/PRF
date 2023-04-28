import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../utils/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string;
  email: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.email = '';
    this.password = '';
  }

  registration() {
    if (this.username != '' && this.email != '' && this.password != '') {
      this.loginService
        .registration(this.username, this.email, this.password)
        .subscribe({
          next: (v) => {
            console.log(v);
            this.router.navigate(['/login']);
          },
          error: (e) => console.log(e),
        });
    }
  }
}

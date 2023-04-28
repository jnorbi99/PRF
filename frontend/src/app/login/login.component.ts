import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../utils/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string;
  password: string;
  loginText: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
    this.loginText = '';
  }

  login() {
    if (this.username != '' && this.password != '') {
      this.loginService.login(this.username, this.password).subscribe({
        next: (v) => {
          localStorage.setItem('user', this.username);
          if (this.username === 'admin') {
            this.router.navigate(['/adminHome']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (e) => {
          console.log(e.error);
          this.loginText = e.error;
        },
      });
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e),
      });
    }
  }
}

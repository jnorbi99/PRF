import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../utils/login.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  users: Array<any>;

  constructor(private loginService: LoginService, private router: Router) {
    this.users = [];
  }

  deleteUser(user: any) {
    if (user) {
      this.loginService.deleteUser(user.username).subscribe({
        next: (v) => {
          this.getAllUser();
        },
        error: (e) => {
          console.log(e);
        },
      });
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

  getAllUser() {
    this.loginService.getAllUser().subscribe({
      next: (v: any) => {
        if (v) {
          this.users = v as any;
        } else {
          this.users = [];
          console.log('Dont have any users');
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
    this.getAllUser();
    localStorage.removeItem('todo');
  }
}

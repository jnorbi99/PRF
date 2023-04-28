import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      'http://localhost:3000/login',
      {
        username: username,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  logout() {
    return this.http.post(
      'http://localhost:3000/logout',
      {},
      { withCredentials: true, responseType: 'text' }
    );
  }

  registration(username: string, email: string, password: string) {
    return this.http.post(
      'http://localhost:3000/register',
      {
        username: username,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  getAllUser() {
    return this.http.get('http://localhost:3000/user', {
      headers: { responseType: 'text' },
    });
  }

  updatePassword(username: string, password: string) {
    return this.http.put(
      'http://localhost:3000/user',
      {
        username: username,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  deleteUser(username: string) {
    return this.http.delete('http://localhost:3000/user', {
      body: {
        username: username,
      },
      responseType: 'text',
    });
  }
}

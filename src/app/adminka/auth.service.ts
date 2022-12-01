import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(User: unknown) {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        User
      )
      .pipe(tap(this.setToken));
  }
  private setToken(response: any) {
    if (response != null) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('firebase-token-exp', expDate.toString());
      localStorage.setItem('firebase-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    let storageDate = localStorage.getItem('firebase-token-exp');
    storageDate == null ? (storageDate = '') : (storageDate = storageDate);
    const expDate = new Date(storageDate);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('firebase-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuth() {
    return !!this.token;
  }
}

import { Injectable } from '@angular/core';
import { HOSTAPITEST } from '../../@constants/path';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName = 'usuario';

  constructor(
    private http: HttpClient) {
  }

  login(usuario: string, password: string) {
    return this.http.post(HOSTAPITEST + 'login', {usuario, password})
      .pipe(
        map((response: any) => {
          if (response.codigo === 200) {
            localStorage.setItem(this.userName, JSON.stringify(response.data));
          }
          return response;
        }),
        catchError(this.handleError));
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(this.userName));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  register() {

  }

  logout() {

  }

  getCurrentUser() {

  }

  handleError(error: any): Observable<any> {
    return throwError(error);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from './user';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
    .set('Access-Control-Allow-Origin', '*')
};
const apiUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string ) {
    return this.http.post<User>('/users/login', {email, password});
    // this is just the HTTP call,
    // we still need to handle the reception of the token
    //   .shareReplay();
  }

  // register(email: string, password: string) {
  //   return this.http.post<{access_token: string}>(apiUrl + '/register', {email, password}).pipe(tap(res => {
  //     this.login(email, password);
  //   }));
  // }
  //
  // logout() {
  //   localStorage.removeItem('token');
  // }
  //
  // public get loggedIn(): boolean {
  //   return localStorage.getItem('token') !==  null;
  // }

}

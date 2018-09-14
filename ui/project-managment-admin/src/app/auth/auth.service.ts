import { Injectable } from '@angular/core';
import {FirebaseAuth} from "@angular/fire";
import {Observable, of} from "rxjs";
import {delay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: FirebaseAuth) {
  }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(email, password): Observable<boolean> {

    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }


  logout(): void {
    this.isLoggedIn = false;
  }

  signUp(email, password) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
  }
}

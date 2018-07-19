import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";
import {delay, tap} from "rxjs/operators";
import {FirebaseAuth} from "angularfire2";

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

  invalidate() {
    this.fireAuth.signInAnonymously();
  }
}

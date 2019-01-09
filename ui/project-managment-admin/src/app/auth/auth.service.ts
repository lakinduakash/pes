import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import {Observable, of, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {fromPromise} from "rxjs/internal-compatibility";
import {User} from "../core/model/user";


@Injectable()
export class AuthService {

  //Main authentication variable that used in other services
  user:Observable<any>;

  cacheUser


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.cacheUser = user
          return of(user)
        } else {
          return of(null)
        }
      })
    )
  }


  /**
   * Google login authenticate
   */
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  /**
   * Access firebase authentication and log in with email and password (Onlyused this method in project)
   * @param email
   * @param password
   */
  emailLogin(email, password) {
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email,password))
  }

  /**
   * Email and password signup
   * @param email
   * @param password
   */
  emailSignUp(email, password) {
    return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(email,password))
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        const data: User = {
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
          photoURL: credential.user.photoURL
        };
        this.updateUserData(credential.user,data)
      })
  }


  updateUserData(user,userData) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usersC/${user.uid}`);

    //Add other details of user as document in firebase
    return fromPromise(userRef.set(userData, {merge: true})) as Observable<any>

  }

  /**
   * Send verification email after creating new email
   */
  sendVerificationEmail() {
    let success:Subject<boolean>=new Subject();

    this.afAuth.user.subscribe(
      next => {
        if (next != null)
          fromPromise(next.sendEmailVerification()).subscribe(next => success.next(true), error => success.next(false))
      });

    return success as Observable<boolean>
  }

  /**
   * Sign out the user and redirect user to login page
   */
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

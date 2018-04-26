import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;

  constructor(
    private _firebaseAuth: AngularFireAuth) {
    this.user = _firebaseAuth.authState;
  }

  public signInWithGoogle() {
    this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(result => {
      this.user = result;
      console.log(`Sign In successful: ${JSON.stringify(result)}`);
    })
      .catch(error => {
        console.log(`error with Google Sign in: ${error}`);
      });
  }

  public get isLoggedIn(): boolean {
    return this.user != null;
  }

  public logout() {
    this.user = null;
    this._firebaseAuth.auth.signOut()
      .then((res) => console.log('logout successful'));
  }
}

import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { EmailPasswordCredentials } from '../entities/credentials.model';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log('userDetails:' + JSON.stringify(this.userDetails));
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  public emailSignUp(credentials: EmailPasswordCredentials): void {
    this.firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => console.log(`Create User successfull: ${JSON.stringify(data)}`))
      .catch(error => console.log(error));
  }

  public signInWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(result => {
      console.log(`Sign In successful: ${JSON.stringify(result)}`);
      this.router.navigate(['home'])
    })
      .catch(error => {
        console.log(`error with Google Sign in: ${error}`);
      });
  }

  public isLoggedIn(): boolean {
    return this.userDetails != null;
  }

  public logout() {
    this.firebaseAuth.auth.signOut()
      .then((res) => {
        console.log('logout successful');
      });
  }
}

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
          if (user != null) {
            user.providerData.forEach(function (profile) {
              console.log("Sign-in provider: " + profile.providerId);
              console.log("  Provider-specific UID: " + profile.uid);
              console.log("  Name: " + profile.displayName);
              console.log("  Email: " + profile.email);
              console.log("  Photo URL: " + profile.photoURL);
            });
          }
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  public emailSignUp(credentials: EmailPasswordCredentials): void {
    this.firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        console.log(`Create user successfull: ${JSON.stringify(data)}`);
        this.router.navigate(['/home']);
      })
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

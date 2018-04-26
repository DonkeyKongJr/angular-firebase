import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {

  private user: Observable<firebase.User>;

  constructor(
    private authService: AuthService,
    private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  ngOnInit() {
  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  public logout() {
    this.authService.logout();
  }
}

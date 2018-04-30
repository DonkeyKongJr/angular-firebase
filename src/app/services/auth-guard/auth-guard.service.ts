import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AngularFireAuth) { }

  canActivate(): Observable<boolean> {

    return Observable.from(this.auth.authState)
      .take(1)
      .map(state => !!state)
      .do(autchenticated => {
        if (!autchenticated) this.router.navigate(['/login']);
      });
  }
}

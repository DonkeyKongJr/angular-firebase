import { Injectable } from '@angular/core';
import { Profile } from '../../entities/profile.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProfileService {

  constructor(private auth: AngularFireAuth) { }

  public get getUserProfile(): Profile {

    const profile = new Profile();

    if (!this.auth.auth || !this.auth.auth.currentUser) {
      return profile;
    }

    profile.displayName = this.auth.auth.currentUser.displayName;
    profile.email = this.auth.auth.currentUser.email;
    profile.photoURL = this.auth.auth.currentUser.photoURL;
    profile.providerId = this.auth.auth.currentUser.providerId;
    profile.uid = this.auth.auth.currentUser.uid;
    
    return profile;
  }
}

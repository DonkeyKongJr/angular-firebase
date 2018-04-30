import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProfileService } from '../../services/user/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserProfileService) { }

  ngOnInit() {

  }
}

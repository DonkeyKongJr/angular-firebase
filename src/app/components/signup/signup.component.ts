import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmailPasswordCredentials } from '../../entities/credentials.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public onSubmit(data: NgForm) {
    console.log(`Data valid: ${(data.valid)}`);
    console.log(`Register: ${JSON.stringify(data.value)}`);

  // ToDo - add validation messages

    if(data.valid){
      const credentials = new EmailPasswordCredentials();
      credentials.email = data.value.email;
      credentials.password = data.value.password;
      
      this.authService.emailSignUp(credentials);
    }
  }
}

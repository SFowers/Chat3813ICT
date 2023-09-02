import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  newuser:User = new User();
  username:string = "";
  email:string = "";
  pwd:string = "";

  constructor(private auth:AuthService, private router:Router) {}

  signup(event:any) {
    console.log(this.email, this.pwd);
    event.preventDefault();
    this.auth.signup(this.email, this.username, this.pwd).subscribe({
      next:
        (res)=>{
          console.log('at signup');
          this.newuser = new User(this.username, this.email, '', res.id);
          this.auth.setCurrentUser(this.newuser);
          console.log(this.auth.getCurrentUser);
          this.router.navigate(['/account']);
        }
    })
  }

}

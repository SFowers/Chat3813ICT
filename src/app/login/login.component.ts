import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  newuser:User = new User();
  email:string = "";
  pwd:string = "";
  loggedin:boolean = false;

  constructor(private router:Router, private auth:AuthService) {}

  ngOnInit() {
    if(sessionStorage.getItem('currentUser')) {
      this.loggedin = true;
    } else {
      this.loggedin = false;
    }
  }
  signin(event:any) {
    console.log('at signin');
    console.log(this.email, this.pwd);
    event.preventDefault();
    this.auth.login(this.email, this.pwd).subscribe({
      next:
        (data)=>{
          if(data.id != 0) {
            this.newuser = new User(data.username, data.email, '', data.permission, data.roles, data.groups, data.id);
            this.auth.setCurrentUser(this.newuser);
            console.log(this.auth.getCurrentUser);
            this.router.navigate(['/account']);
          } else {
            console.log("There is a problem with the credentials");
          }   
        }
    })
  }
}
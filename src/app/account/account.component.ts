import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  currentUser:User = new User();
  username:string = '';
  email:string = '';
  pwd:string = '';
  error:string = '';

  constructor(private auth:AuthService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    this.username = this.currentUser.username;
    this.email = this.currentUser.email;
  }

  groupAdminApplication(event:any) {

  }

  deleteAccount(event:any) {

  }
  
  updateAccount(event:any) {
    alert("Not yet Implemented.");
    /*
    if(this.username == "" || this.email == "" || this.pwd == "") {
      this.error = "Please fill all fields.";
    }
    */
  }
}

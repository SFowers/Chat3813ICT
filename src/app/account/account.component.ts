import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { ApplicationsService } from '../services/applications.service';

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
  permission:string = '';
  error:string = '';

  constructor(private auth:AuthService, private application:ApplicationsService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    this.username = this.currentUser.username;
    this.email = this.currentUser.email;
    this.permission = this.currentUser.permission;
  }

  groupAdminApplication() {
    this.application.groupAdminApplication(this.currentUser.username);
    alert("group admin apply");
  }
  superAdminApplication() {
    this.application.superAdminApplication(this.currentUser.username);
  }

  deleteAccount() {

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

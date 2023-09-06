import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { ApplicationsService } from '../services/applications.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  newuser:User = new User();
  currentUser:User = new User();
  username:string = '';
  email:string = '';
  //pwd:string = '';
  permission:string = '';
  applyMessage:string = '';
  error:string = '';
  groupadmin:string = 'group admin';
  superadmin:string = 'super admin';

  constructor(private auth:AuthService, private application:ApplicationsService, private router:Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    if(this.currentUser == null) {
      this.router.navigate(['/account']);
    }
    this.username = this.currentUser.username;
    this.email = this.currentUser.email;
    this.permission = this.currentUser.permission;
  }

  groupAdminApplication() {
    this.application.groupAdminApplication(this.currentUser.username).subscribe({
      next:
        (data)=>{
          this.applyMessage = data.m;
          //console.log(JSON.stringify(data) + JSON.parse(data).m);
        }
    })
  }
  superAdminApplication() {
    this.application.superAdminApplication(this.currentUser.username).subscribe({
      next:
        (data)=>{
          this.applyMessage = data.m;
          console.log(data);
        }
    })
  }

  superControls() {
    this.router.navigate(['super']);
  }

  deleteAccount(event:any) {
    this.auth.deleteUser(this.currentUser).subscribe({
      next:
        (data)=>{
          console.log(data);
          this.auth.logout(event);
          this.router.navigate(['/login']);
        }
    })
    this.auth.logout(event);
    this.router.navigate(['/login']);
  }

  updateAccount(event:any) {
    event.preventDefault();
    this.currentUser.username = this.username;
    this.currentUser.email = this.email;
    this.auth.updateUser(this.currentUser).subscribe({
      next:
        (data)=>{
          this.newuser = new User(data.username, data.email, '', data.permission, data.id);
          this.auth.setCurrentUser(this.newuser);
        }
    })
  }
}

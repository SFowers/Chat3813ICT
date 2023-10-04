import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { Group } from './group';
import { GroupService } from './services/group.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  currentUser:User = new User();
  myGroups:Group[] = [];
  allGroups:Group[] = [];

  constructor(private auth:AuthService,
              private groupService:GroupService, 
              private router:Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    if(this.currentUser) {
      this.getAllGroups();
    }
  }

  getAllGroups() {
    this.allGroups = [];
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        this.allGroups = JSON.parse(data);
        //console.log("allgroups: " + this.allGroups[0].groupname);
        this.getMyGroups();
      }
    });
  }

  getMyGroups() {
    this.myGroups = [];
    for(let i = 0; i < this.allGroups.length; i++ ) {
      for(let j = 0; j < this.allGroups[i].users.length; j++) {
        if(this.currentUser.username == this.allGroups[i].users[j]) {
          this.myGroups.push(this.allGroups[i]);
          //console.log(this.myGroups)
        }
      }
    }
  }

  onSelect(group:Group) {
    let inGroup = false;
    for(let j = 0; j < group.users.length; j++) {
      if(this.currentUser.username == group.users[j]) {
        //console.log("in group");
        inGroup = true;
      }
    }
    if(inGroup) {
      //alert("in This group");
      this.groupService.setCurrentGroup(group);
      this.router.navigate(['/group', group.groupname]);
    }
  }

  logOut(event:any) {
    this.auth.logout(event);
    this.router.navigate(['/login']);
  }
}

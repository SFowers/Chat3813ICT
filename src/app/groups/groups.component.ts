import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GroupService } from '../services/group.service';
import { User } from '../user';
import { Group } from '../group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {

  currentUser:User = new User();
  myGroups:Group[] = [];
  allGroups:Group[] = [];
  gadmin:string = 'group admin';
  sadmin:string = 'super admin';
  groupname:string = '';
  error:string = '';
  showCreate:boolean = false;

  constructor(private auth:AuthService, private groupService:GroupService, private router:Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    if(this.currentUser == null) {
      this.router.navigate(['/login']);
    }
    this.getAllGroups();
    this.groupname = '';
  }

  getAllGroups() {
    this.allGroups = [];
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        console.log(data);
        this.allGroups = data;
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

  showCreateGroup() {
    this.showCreate = !this.showCreate;
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
    } else {
      if(this.currentUser.permission == this.sadmin) {
        this.superJoinGroup(group);
      } else {
        this.applytogroup(group);
      }
    }
  }

  superJoinGroup(group:Group) {
    group.admins.push(this.currentUser.username);
    group.users.push(this.currentUser.username);
    this.groupService.updateGroup(group).subscribe({
      next:
        (res)=>{
          console.log(res + ' group updated');
        }
    })
  }

  applytogroup(group:Group) {
    console.log(group.id);
    if(!group.applied.includes(this.currentUser.username)) {
      group.applied.push(this.currentUser.username);
      this.groupService.updateGroup(group).subscribe({
        next: (data) => {
          //this.allGroups = JSON.parse(data);
          //console.log("allgroups: " + this.allGroups[0].groupname);
          //this.getMyGroups();
        }
      });
    } else {
      alert("Already applied to group " + group.groupname);
    }
  }

  createGroup(event:any) {
    if(this.groupname == "") {
      this.error = "Please give the group a name.";
    } else {
      event.preventDefault();
      this.groupService.createGroup(this.groupname, this.currentUser.username).subscribe({
        next:
          (res)=>{
            console.log(res.groupname);
            this.ngOnInit();
          }
      })
    }
  }
}

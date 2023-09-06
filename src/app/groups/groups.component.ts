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

  constructor(private auth:AuthService, private groupService:GroupService, private router:Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    if(this.currentUser == null) {
      this.router.navigate(['/account']);
    }
    this.getAllGroups();
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
    //if(group.users.includes(this.currentUser.username))
    console.log(group + this.currentUser.username);
    let inGroup = false;
    for(let j = 0; j < group.users.length; j++) {
      if(this.currentUser.username == group.users[j]) {
        console.log("in group");
        inGroup = true;
      }
    }
    if(inGroup) {
      //alert("in This group");
      this.groupService.setCurrentGroup(group);
      this.router.navigate(['/group']);
    } else {
      console.log("Not in group");
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
            //this.getAllGroups();
          }
      })
    }
  }
}

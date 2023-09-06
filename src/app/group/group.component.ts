import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { AuthService } from '../services/auth.service';
import { Group } from '../group';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {

  currentGroup:Group = new Group();
  currentUser:User = new User();
  channels = [];
  admins = [];
  users = [];
  applied = [];
  admin:Boolean = false;
  cname:string = '';

  constructor(private groupService:GroupService, private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    this.currentGroup = JSON.parse(this.groupService.getCurrentGroup() || '{}');
    if(!this.currentGroup.groupname) {
      this.router.navigateByUrl('/groups');
    }
    this.checkGroupAdmin();
  }

  checkGroupAdmin() {
    for(let i = 0; i < this.currentGroup.admins.length; i++) {
      if(this.currentUser.username == this.currentGroup.admins[i]) {
        this.admin = true;
      }
    }
  }

  createChannel() {
    this.currentGroup.channels.push(this.cname);
    this.updateGroup();
    this.cname = '';
  }

  addApplicant(app:string) {
    for(let i = 0; i < this.currentGroup.applied.length; i++) {
      if(this.currentGroup.applied[i] == app) {
        this.currentGroup.applied.splice(i, 1);
        this.currentGroup.users.push(app);
      }
    }
    this.updateGroup();
  }

  addAdmin(user:string) {
    this.currentGroup.admins.push(user);
    this.updateGroup();
  } 

  onSelect(channel:string) {
    console.log(channel)
    this.router.navigate(['/chat']);
  }

  updateGroup() {
    //event.preventDefault();
    this.groupService.updateGroup(this.currentGroup).subscribe({
      next:
        (res)=>{
          console.log(res + ' group updated');
        }
    })
  }

  deleteGroup(event:any) {
    this.groupService.deleteGroup(this.currentGroup).subscribe({
      next:
        (res)=>{
          console.log(res);
          this.router.navigateByUrl('/groups');
        }
    });
    this.router.navigate(['/groups']);
  }
}

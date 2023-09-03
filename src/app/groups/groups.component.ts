import { Component, OnInit } from '@angular/core';
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

  constructor(private auth:AuthService, private groupService:GroupService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        console.log("data " + data);
        this.allGroups = JSON.parse(data);
        console.log(this.allGroups);
      }
    });

    
    //for(let i = 0; i < this.allGroups.length; i++ ) {
      //if(this.currentUser.username == this.allGroups[i].user) {

      //}
    //}
  }

  onSelect() {

  }
}

import { Component, OnInit } from '@angular/core';
import { Application } from '../application';
import { ApplicationsService } from '../services/applications.service';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-super-controls',
  templateUrl: './super-controls.component.html',
  styleUrls: ['./super-controls.component.css']
})
export class SuperControlsComponent {
  applications:Application[] = [];
  users:User[] = [];
  gadmin:string = 'group admin';
  sadmin:string = 'super admin';

  constructor(private applService:ApplicationsService, private auth:AuthService) {}

  ngOnInit() {
    this.auth.getAllUsers().subscribe({
      next: (data) => {
        //This is the only way it works for some reason
        this.users = JSON.parse(JSON.stringify(data));
      }
    })
    /*
    this.applService.getApplications().subscribe({
      next: (data) => {
        console.log(this.applications);
        this.applications = JSON.parse(data);
        console.log(this.applications);
      }
    });
    */
  }

  makeAdmin(user:User, perm:string) {
    user.permission = perm;
    this.auth.updateUser(user).subscribe({
      next:
        (data)=>{
          console.log(data);
        }
    })
  }
}

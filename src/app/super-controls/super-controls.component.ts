import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-controls',
  templateUrl: './super-controls.component.html',
  styleUrls: ['./super-controls.component.css']
})
export class SuperControlsComponent {
  currentUser:User = new User();
  users:User[] = [];
  gadmin:string = 'group admin';
  sadmin:string = 'super admin';
  user:string = 'user';

  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
    if(this.currentUser == null || this.currentUser.permission !== this.sadmin) {
      this.router.navigate(['/login']);
    }
    this.auth.getAllUsers().subscribe({
      next: (data) => {
        //This is the only way it works for some reason
        this.users = JSON.parse(JSON.stringify(data));
      }
    })
  }

  changePermission(user:User, perm:string) {
    user.permission = perm;
    this.auth.updateUser(user).subscribe({
      next:
        (data)=>{
          console.log(data);
        }
    })
  }
}

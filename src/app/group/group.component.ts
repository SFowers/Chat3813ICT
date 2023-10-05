import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { AuthService } from '../services/auth.service';
import { Group } from '../group';
import { User } from '../user';
import { Router, ActivatedRoute } from '@angular/router';

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
  sadmins:Boolean = false;
  ssettings:Boolean = false;
  susers:Boolean = false;
  sapplications:Boolean = false;

  constructor(private groupService:GroupService, 
              private auth:AuthService, 
              private router:Router,
              private actRoute:ActivatedRoute) {}

  ngOnInit() {
    this.actRoute.paramMap.subscribe(params => {
      const groupname = params.get('groupname');
      this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
      this.currentGroup = JSON.parse(this.groupService.getCurrentGroup() || '{}');
      if(this.currentGroup.groupname != groupname) {
        this.router.navigateByUrl('/groups');
      }
      this.checkGroupAdmin();
    })
  }

  checkGroupAdmin() {
    for(let i = 0; i < this.currentGroup.admins.length; i++) {
      if(this.currentUser.username == this.currentGroup.admins[i]) {
        this.admin = true;
      }
    }
  }
  showAdmins() {
    return this.sadmins = !this.sadmins;
  }
  showSettings() {
    return this.ssettings = !this.ssettings;
  }
  showUsers() {
    return this.susers = !this.susers;
  }
  showApplications() {
    return this.sapplications = !this.sapplications;
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

  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
   console.log("Current route I am on:",this.router.url);
   const url=self ? this.router.url :urlToNavigateTo;
   this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
     this.router.navigate([`/${url}`]).then(()=>{
       console.log(`After navigation I am on:${this.router.url}`)
     })
   })
 }
}

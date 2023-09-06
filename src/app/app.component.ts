import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  currentUser:User = new User();

  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {
    //this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');
  }

  logOut(event:any) {
    this.auth.logout(event);
    this.router.navigate(['/login']);
  }
}

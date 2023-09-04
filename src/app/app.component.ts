import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';

  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {}

  logOut(event:any) {
    this.auth.logout(event);
    this.router.navigate(['/login']);
  }
}

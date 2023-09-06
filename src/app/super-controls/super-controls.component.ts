import { Component, OnInit } from '@angular/core';
import { Application } from '../application';
import { ApplicationsService } from '../services/applications.service';

@Component({
  selector: 'app-super-controls',
  templateUrl: './super-controls.component.html',
  styleUrls: ['./super-controls.component.css']
})
export class SuperControlsComponent {
  applications:Application[] = [];

  constructor(private applService:ApplicationsService) {}

  ngOnInit() {
    this.applService.getApplications().subscribe({
      next: (data) => {
        console.log(this.applications);
        this.applications = JSON.parse(data);
        console.log(this.applications);
      }
    });
  }

  onApprove(app:Application) {

  }
  onDisapprove(app:Application) {
    
  }
}

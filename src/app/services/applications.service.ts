import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http:HttpClient) {}

  groupAdminApplication(username:string) {
    console.log("here");
    return this.http.post('http://localhost:3000/api/adminapplication', {permission: "group admin", username: username});
  }

  superAdminApplication(username:string) {
    return this.http.post('http://localhost:3000/api/adminapplication', {permission: "super admin", username: username});
  }
}

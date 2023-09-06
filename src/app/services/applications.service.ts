import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerMessage } from '../servermessage';
import { Application } from '../application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http:HttpClient) {}

  groupAdminApplication(username:string) {
    return this.http.post<ServerMessage>('http://localhost:3000/api/adminapplication', {permission: "group admin", username: username});
  }

  superAdminApplication(username:string) {
    return this.http.post<ServerMessage>('http://localhost:3000/api/adminapplication', {permission: "super admin", username: username});
  }

  getApplications() {
    return this.http.get<string>('http://localhost:3000/api/getapplications', {});
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private router:Router, private http:HttpClient) {}

  getAllGroups() {
    return this.http.get<string>('http://localhost:3000/api/getgroups', {});
  }

}

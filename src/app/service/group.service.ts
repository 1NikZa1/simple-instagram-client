import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../models/Group";

const GROUP_API = "http://localhost:8080/api/community/";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  getAllGroups(): Observable<any> {
    return this.http.get(GROUP_API + 'all');
  }

  getFollowedUsers(id: number): Observable<any> {
    return this.http.get(GROUP_API + id + '/followed')
  }

  followGroup(id: number): Observable<any> {
    return this.http.get(GROUP_API + id + '/follow');
  }

  createGroup(group: Group): Observable<any> {
    return this.http.post(GROUP_API + 'create', group);
  }

  getGroup(id: number): Observable<any> {
    return this.http.get(GROUP_API + id);
  }

  updateGroup(id: number, group: Group): Observable<any> {
    return this.http.post(GROUP_API + id + '/update', group);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.post(GROUP_API + id + '/delete', null);
  }

}

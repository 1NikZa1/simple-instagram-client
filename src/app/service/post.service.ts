import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/Post";
import {Observable} from "rxjs";

const POST_API = "http://localhost:8080/api/post/";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  createPostForUser(post: Post): Observable<any> {
    return this.http.post(POST_API + 'create', post);
  }

  createPostForGroup(post: Post, groupId: number): Observable<any> {
    return this.http.post(POST_API + groupId + '/create', post);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(POST_API + 'all');
  }

  getFeed(): Observable<any> {
    return this.http.get(POST_API + 'feed')
  }

  getPostForUser(): Observable<any> {
    return this.http.get(POST_API + 'user/posts')
  }

  getPostForUserById(userId: number): Observable<any> {
    return this.http.get(POST_API + 'user/' + userId + '/posts')
  }

  getPostsForGroup(groupId: number): Observable<any> {
    return this.http.get(POST_API + 'community/' + groupId + '/posts')
  }

  deletePost(id: number): Observable<any> {
    return this.http.post(POST_API + id + '/delete', null);
  }

  likePost(id: number, username: string): Observable<any> {
    return this.http.post(POST_API + id + "/" + username + "/like", null);
  }
}

import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../service/post.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-another-user-posts',
  templateUrl: './another-user-posts.component.html',
  styleUrls: ['./another-user-posts.component.css']
})
export class AnotherUserPostsComponent implements OnInit {

  userId: number;
  private subscription: Subscription;
  isUserPostsLoaded: boolean = false;
  posts: Post[];

  constructor(private activateRoute: ActivatedRoute,
              private router:Router,
              private postService: PostService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(params => this.userId = parseInt(params['id']));

    this.postService.getPostForUserById(this.userId)
      .subscribe(data => {
        console.log(data);
        this.posts = data
        this.getImagesToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isUserPostsLoaded = true;
      })
  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.imageService.getImageToPost(post.id!)
        .subscribe(data => {
          post.image = data.imageBytes;
        })
    });
  }

  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.commentService.getCommentsToPost(post.id!)
        .subscribe(data => {
          post.comments = data;
        })
    });
  }

  removePost(post: Post, index: number): void {
    console.log(post);
    const result = confirm('post will be deleted');
    if (result) {
      this.postService.deletePost(post.id!)
        .subscribe(() => {
          this.posts.splice(index, 1);
          this.notificationService.showSnackBar('post deleted');
        })
    }
  }

  formatImage(image: any): any {
    if (image == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + image;
  }

  deleteComment(commentId: number, postIndex: number, commentIndex: number): void {
    const post = this.posts[postIndex];
    this.commentService.delete(commentId)
      .subscribe(() => {
        this.notificationService.showSnackBar('comment removed');
        post.comments!.splice(commentIndex, 1);
      })

  }

}

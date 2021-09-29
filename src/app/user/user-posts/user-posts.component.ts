import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";
import {Post} from "../../models/Post";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  isUserPostsLoaded: boolean = false;
  posts: Post[];

  constructor(private postService: PostService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.postService.getPostForUser()
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

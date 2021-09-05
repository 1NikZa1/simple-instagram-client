import { Component, OnInit } from '@angular/core';
import {PostService} from "../../service/post.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent implements OnInit {

  constructor(private postService: PostService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

}

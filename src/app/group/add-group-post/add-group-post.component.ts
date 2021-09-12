import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/Post";
import {PostService} from "../../service/post.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-group-post',
  templateUrl: './add-group-post.component.html',
  styleUrls: ['./add-group-post.component.css']
})
export class AddGroupPostComponent implements OnInit {

  id: number | undefined;
  postForm: FormGroup;
  selectedFile: File;
  isPostCreated: boolean = false;
  createdPost: Post;
  previewImageURL: any;
  private href: string;

  constructor(private postService: PostService,
              private imageService: ImageUploadService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.href = this.router.url;
    this.href = this.href.replace('/groups/','').replace('/add','');
    this.id = parseInt(this.href);
    this.postForm = this.createPostForm();
  }

  createPostForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      caption: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    this.postService.createPostForGroup({
      title: this.postForm.value.title,
      caption: this.postForm.value.caption,
      location: this.postForm.value.location
    }, this.id!).subscribe(data => {
      this.createdPost = data;

      if (this.createdPost.id != null) {
        this.imageService.uploadImageToPost(this.selectedFile, this.createdPost.id)
          .subscribe(() => {
            this.notificationService.showSnackBar('post created successfully');
            this.isPostCreated = true;
            this.router.navigate(['/groups/' + this.id]);
          });
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImageURL = reader.result;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-another-user-profile',
  templateUrl: './another-user-profile.component.html',
  styleUrls: ['./another-user-profile.component.css']
})
export class AnotherUserProfileComponent implements OnInit {

  id: number;
  private subscription: Subscription;
  isUserDataLoaded: boolean = false;
  user: User;
  userProfileImage: File;
  previewImageURL: any;

  constructor(private activateRoute: ActivatedRoute,
              private router:Router,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(params => this.id = parseInt(params['id']));
    this.userService.getUserById(this.id)
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data=>{
        if (data.id==this.id){
          this.router.navigate(['/profile']);
        }
      })

    this.imageService.getProfileImageById(this.id)
      .subscribe(data => {
        this.userProfileImage = data.imageBytes;
      });
  }

  formatImage(image: any): any {
    if (image == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + image;
  }

}

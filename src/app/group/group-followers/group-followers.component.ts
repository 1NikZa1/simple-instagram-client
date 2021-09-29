import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {ImageUploadService} from "../../service/image-upload.service";
import {GroupService} from "../../service/group.service";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-group-followers',
  templateUrl: './group-followers.component.html',
  styleUrls: ['./group-followers.component.css']
})
export class GroupFollowersComponent implements OnInit {
  id: number | undefined;
  isAdmin: boolean = false;
  previewImageURL: any;
  private href: string;
  users: User[];
  isUsersLoaded: boolean = false;


  constructor(private router: Router,
              private imageService: ImageUploadService,
              private groupService: GroupService,
              private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.href = this.router.url;
    this.href = this.href.replace('/groups/', '').replace('/followers', '');
    this.id = parseInt(this.href);

    this.groupService.getAdmin(this.id)
      .subscribe(data => {
        this.userService.getCurrentUser().subscribe(user => {
          if (user.id == data.id)
            this.isAdmin = true;
        })
      })
    this.groupService.getFollowedUsers(this.id)
      .subscribe(data => {
        console.log(data);
        this.users = data;
        this.isUsersLoaded = true;
      })
  }


  removeUser(user: User, index: number): void {
    const result = confirm('user will be deleted');
    if (result) {
      this.groupService.followGroup(user.id)
        .subscribe(() => {
          this.users.splice(index, 1);
          this.notificationService.showSnackBar('group deleted');
        })
    }
  }

  formatImage(image: any): any {
    if (image == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + image;
  }

}

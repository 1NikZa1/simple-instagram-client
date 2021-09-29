import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../models/User";
import {Group} from "../../models/Group";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {UserService} from "../../service/user.service";
import {GroupService} from "../../service/group.service";
import {EditGroupComponent} from "../edit-group/edit-group.component";

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit {

  id: number;
  private subscription: Subscription;
  isGroupDataLoaded: boolean = false;
  isFollowed: boolean = false;
  group: Group;
  user: User;
  selectedFile: File;
  groupProfileImage: File;
  previewImageURL: any;
  isAdmin: boolean = false;

  constructor(private activateRoute: ActivatedRoute,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private userService: UserService,
              private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(params => this.id = parseInt(params['id']));
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
      });

    this.groupService.getAdmin(this.id!)
      .subscribe(data => {
        this.userService.getCurrentUser().subscribe(user => {
          if (user.id == data.id)
            this.isAdmin = true;
        })
      })

    this.imageService.getImageToGroup(this.id!)
      .subscribe(data => {
        this.groupProfileImage = data.imageBytes;
      });

    this.userService.getFollowedGroups()
      .subscribe(data => {
        let ids: number[] = [];
        for (let i = 0; i < data.length; i++) {
          const id: number = data[i].id;
          ids.push(id)
        }
        this.isFollowed = ids.includes(this.id);
        console.log('isFollowed: ' + this.isFollowed)
      });

    this.groupService.getGroup(this.id!)
      .subscribe(data => {
        console.log(data);
        this.group = data;
        this.isGroupDataLoaded = true;
      })
  }

  followGroup(): void {
    this.groupService.followGroup(this.id!)
      .subscribe(() => {
        this.notificationService.showSnackBar("ok");
        this.isFollowed = !this.isFollowed;
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

  openEditDialog(): void {
    const dialogEditGroupConfig = new MatDialogConfig();
    dialogEditGroupConfig.width = '400px';
    dialogEditGroupConfig.data = {
      group: this.group
    }
    this.dialog.open(EditGroupComponent, dialogEditGroupConfig);
  }

  onUpload(): void {
    if (this.selectedFile != null
    ) {
      this.imageService.uploadImageToGroup(this.selectedFile, this.id!)
        .subscribe(() => {
          this.notificationService.showSnackBar("User image updated successfully")
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

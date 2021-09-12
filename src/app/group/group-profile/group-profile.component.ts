import { Component, OnInit } from '@angular/core';
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

  id: number | undefined;
  private subscription: Subscription;
  isGroupDataLoaded: boolean = false;
  group: Group;
  user: User;
  selectedFile: File;
  groupProfileImage: File;
  previewImageURL: any;

  constructor(private activateRoute: ActivatedRoute,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private userService: UserService,
              private groupService: GroupService) { }

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(params=>this.id=params['id']);
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
      });

    this.groupService.getGroup(this.id!)
      .subscribe(data => {
        console.log(data);
        this.group = data;
        this.isGroupDataLoaded = true;
      })

    this.imageService.getImageToGroup(this.id!)
      .subscribe(data => {
        this.groupProfileImage = data.imageBytes;
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
    if (this.selectedFile != null) {
      this.imageService.uploadImageToGroup(this.selectedFile,this.id!)
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

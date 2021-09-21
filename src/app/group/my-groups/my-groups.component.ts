import { Component, OnInit } from '@angular/core';
import {Group} from "../../models/Group";
import {ImageUploadService} from "../../service/image-upload.service";
import {GroupService} from "../../service/group.service";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit {

  groups: Group[];
  isGroupsLoaded: boolean = false;

  constructor(private imageService: ImageUploadService,
              private groupService: GroupService,
              private userService: UserService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userService.getFollowedGroups()
      .subscribe(data => {
        console.log(data);
        this.groups = data;
        this.getImagesToGroups(this.groups);
        this.isGroupsLoaded = true;
      })
  }

  getImagesToGroups(groups: Group[]): void {
    groups.forEach(group => {
      this.imageService.getImageToGroup(group.id!)
        .subscribe(data => {
          group.image = data.imageBytes;
        })
    });
  }

  removeGroup(group: Group, index: number): void {
    const result = confirm('group will be deleted');
    if (result) {
      this.groupService.deleteGroup(group.id!)
        .subscribe(() => {
          this.groups.splice(index, 1);
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

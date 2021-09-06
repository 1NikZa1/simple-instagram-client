import { Component, OnInit } from '@angular/core';
import {ImageUploadService} from "../../service/image-upload.service";
import {GroupService} from "../../service/group.service";
import {Group} from "../../models/Group";

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent implements OnInit {

  groups: Group[];
  isGroupsLoaded: boolean = false;

  constructor(private imageService: ImageUploadService,
              private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getAllGroups()
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

  formatImage(image: any): any {
    if (image == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + image;
  }
}

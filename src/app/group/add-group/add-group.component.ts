import {Component, OnInit} from '@angular/core';
import {ImageUploadService} from "../../service/image-upload.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../service/group.service";
import {Group} from "../../models/Group";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  groupForm: FormGroup;
  createdGroup: Group;
  isGroupCreated: boolean = false;
  previewImageURL: any;
  selectedFile: File;

  constructor(private groupService: GroupService,
              private imageService: ImageUploadService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.groupForm = this.createGroupForm();
  }

  createGroupForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    this.groupService.createGroup({
      name: this.groupForm.value.name,
      description: this.groupForm.value.description
    }).subscribe(data => {
      this.createdGroup = data;

      if (this.createdGroup.id != null) {
        this.imageService.uploadImageToGroup(this.selectedFile, this.createdGroup.id)
          .subscribe(() => {
            this.notificationService.showSnackBar('group created successfully');
            this.isGroupCreated = true;
            this.router.navigate(['/groups/']);
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

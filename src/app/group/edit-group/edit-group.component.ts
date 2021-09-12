import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {GroupService} from "../../service/group.service";
import {Group} from "../../models/Group";

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {


  public groupEditForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditGroupComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.groupEditForm = this.createGroupForm();
  }

  createGroupForm(): FormGroup {
    return this.fb.group({
      name: [
        this.data.group.name,
        Validators.compose([Validators.required])
      ],
      description: [
        this.data.group.description,
        Validators.compose([Validators.required])
      ]
    });
  }

  submit(): void {
    this.groupService.updateGroup(this.data.group.id, this.updateGroup())
      .subscribe(() => {
        this.notificationService.showSnackBar('group info updated successfully');
        this.dialogRef.close();
      })
  }

  private updateGroup(): Group {
    this.data.group.name = this.groupEditForm.value.name;
    this.data.group.description = this.groupEditForm.value.description;
    return this.data.group;
  }

  closeDialog(): any {
    this.dialogRef.close();
  }
}

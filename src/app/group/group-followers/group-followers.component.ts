import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Post} from "../../models/Post";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-followers',
  templateUrl: './group-followers.component.html',
  styleUrls: ['./group-followers.component.css']
})
export class GroupFollowersComponent implements OnInit {
  id: number | undefined;
  postForm: FormGroup;
  selectedFile: File;
  isPostCreated: boolean = false;
  createdPost: Post;
  previewImageURL: any;
  private href: string;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    this.href = this.href.replace('/groups/','').replace('/add','');
    this.id = parseInt(this.href);
  }

}

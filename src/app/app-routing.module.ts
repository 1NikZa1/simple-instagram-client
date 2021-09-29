import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {ProfileComponent} from "./user/profile/profile.component";
import {UserPostsComponent} from "./user/user-posts/user-posts.component";
import {AddPostComponent} from "./user/add-post/add-post.component";
import {AllGroupsComponent} from "./group/all-groups/all-groups.component";
import {GroupProfileComponent} from "./group/group-profile/group-profile.component";
import {AddGroupPostComponent} from "./group/add-group-post/add-group-post.component";
import {GroupPostsComponent} from "./group/group-posts/group-posts.component";
import {AddGroupComponent} from "./group/add-group/add-group.component";
import {UserFeedComponent} from "./user/user-feed/user-feed.component";
import {MyGroupsComponent} from "./group/my-groups/my-groups.component";
import {GroupFollowersComponent} from "./group/group-followers/group-followers.component";
import {ManageGroupsComponent} from "./group/manage-groups/manage-groups.component";
import {AnotherUserProfileComponent} from "./user/another-user-profile/another-user-profile.component";
import {AnotherUserPostsComponent} from "./user/another-user-posts/another-user-posts.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {path: 'groups', component: MyGroupsComponent, canActivate: [AuthGuardService]},
  {path: 'all-groups', component: AllGroupsComponent, canActivate: [AuthGuardService]},
  {path: 'manage-groups', component: ManageGroupsComponent, canActivate: [AuthGuardService]},
  {path: 'feed', component: UserFeedComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: UserPostsComponent, canActivate: [AuthGuardService]},
      {path: 'add', component: AddPostComponent, canActivate: [AuthGuardService]}
    ]
  },
  {
    path: 'user/:id', component: AnotherUserProfileComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: AnotherUserPostsComponent, canActivate: [AuthGuardService]}
    ]
  },
  {path: '404', redirectTo: 'main'},
  { path: 'groups/:id', component: GroupProfileComponent,canActivate:[AuthGuardService],children:[
      {path: '', component: GroupPostsComponent, canActivate: [AuthGuardService]},
      {path: 'add', component: AddGroupPostComponent, canActivate: [AuthGuardService]},
      {path: 'followers', component: GroupFollowersComponent, canActivate: [AuthGuardService]},
    ]},
  {path: 'add-group',component: AddGroupComponent,canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
